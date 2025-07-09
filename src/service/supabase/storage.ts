import { createClient } from "./client";

const supabase = createClient();

export const uploadMultipleImages = async (files: FileList | File[]) => {
  const uploadPromises = Array.from(files).map(async (file) => {
    const filePath = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("trip-ai")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error || !data) {
      console.error(`${file.name} 업로드 실패:`, error?.message);
      return null;
    }

    const publicUrlData = supabase
      .storage
      .from("trip-ai")
      .getPublicUrl(data.path);

    if (!publicUrlData?.data?.publicUrl) {
      console.warn("퍼블릭 URL 생성 실패:", data.path);
      return null;
    }

    return {
      image_url: data.path,
    };
  });

  const results = await Promise.all(uploadPromises);
  return results.filter((res) => res !== null);
};