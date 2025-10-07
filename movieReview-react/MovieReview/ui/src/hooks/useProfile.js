
import { useAuth } from "../context/AuthContext";

export default function useProfile() {
  const { profile, setProfile, loading } = useAuth();
  return { profile, setProfile, loading };
}
