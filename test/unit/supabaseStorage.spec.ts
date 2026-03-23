describe('getStorageUrl', () => {
  let getStorageUrl: (path: string) => string;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const module = require('../../src/util/supabaseStorage');
    getStorageUrl = module.getStorageUrl;
  });

  afterAll(() => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  });

  it('올바른 Supabase Storage URL을 생성한다', () => {
    expect(getStorageUrl('profile/image.jpg')).toBe(
      'https://test.supabase.co/storage/v1/object/public/trip-ai/profile/image.jpg'
    );
  });

  it('중첩 경로를 올바르게 처리한다', () => {
    expect(getStorageUrl('users/123/avatar.png')).toBe(
      'https://test.supabase.co/storage/v1/object/public/trip-ai/users/123/avatar.png'
    );
  });

  it('파일명만 전달해도 올바른 URL을 생성한다', () => {
    expect(getStorageUrl('image.jpg')).toBe(
      'https://test.supabase.co/storage/v1/object/public/trip-ai/image.jpg'
    );
  });

  it('항상 /storage/v1/object/public/trip-ai/ 경로를 포함한다', () => {
    const url = getStorageUrl('anything');
    expect(url).toContain('/storage/v1/object/public/trip-ai/');
  });
});
