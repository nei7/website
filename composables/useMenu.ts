export default function useMenu() {
  return useState("menuOpen", () => false);
}
