export interface UnsplashImage {
  id: string;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  alt_description: string | null;
  user: {
    username: string;
    name: string;
  };
}
