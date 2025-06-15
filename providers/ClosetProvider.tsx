import { supabase } from "@/supabase";
import { Closet } from "@/types";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { ImagePickerAsset } from "expo-image-picker";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

type ClosetData = {
  loading: boolean;
  closet: Closet | null;
  uploadImageAndUpdateCloset: (image: ImagePickerAsset) => Promise<void>;
};

const ClosetContext = createContext<ClosetData>({
  loading: true,
  closet: null,
  uploadImageAndUpdateCloset: async () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function ClosetProvider(props: Props) {
  const { session } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [closet, setCloset] = useState<Closet | null>(null);

  const fetchCloset = async () => {
    if (!session) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("closets")
      .select("*, closet_items(*)")
      .eq("user_id", session.user.id);

    if (error) {
      console.error("Error fetching closet:", error);
      setLoading(false);
      return;
    }

    if (data.length > 0) {
      setCloset(data[0] as Closet);
    }

    setLoading(false);
  };

  const uploadImageAndUpdateCloset = async (image: ImagePickerAsset) => {
    setLoading(true);

    const base64 = await FileSystem.readAsStringAsync(image.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const filePath = `${session?.user.id}/${new Date().getTime()}.png`;

    const uploadedImg = await supabase.storage
      .from("clothes")
      .upload(filePath, decode(base64), {
        contentType: "image/png",
      });

    if (uploadedImg.error) {
      console.error("Error uploading image:", uploadedImg.error);
      setLoading(false);
      return;
    }

    const { data } = supabase.storage
      .from("clothes")
      .getPublicUrl(uploadedImg.data.path);

    const { error } = await supabase.from("closet_items").insert({
      name: image.fileName || "New Item",
      category: "Uncategorized",
      image_url: data.publicUrl,
      closet_id: closet?.id,
    });

    if (error) {
      console.error("Error uploading image and updating closet:", error);
      setLoading(false);
      return;
    }

    await fetchCloset();
    setLoading(false);
  };

  useEffect(() => {
    fetchCloset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ClosetContext.Provider
      value={{ loading, closet, uploadImageAndUpdateCloset }}
    >
      {props.children}
    </ClosetContext.Provider>
  );
}

export const useCloset = () => {
  const context = useContext(ClosetContext);
  if (!context) {
    throw new Error("useCloset must be used within a ClosetProvider");
  }
  return context;
};
