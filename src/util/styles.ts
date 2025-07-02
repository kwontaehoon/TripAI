export function getBadgeColor(idx: number): string {
    switch (idx) {
      case 1:
        return "bg-blue-100 text-blue-700";
      case 2:
        return "bg-green-100 text-green-700";
      case 3:
        return "bg-pink-100 text-pink-700";
      default:
        return "bg-purple-100 text-purple-700";
    }
  }
