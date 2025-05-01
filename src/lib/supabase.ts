import { createClient } from "@supabase/supabase-js";

const supaBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supaBaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

// Create a single supabase client for interacting with your database
const supabase = createClient(supaBaseUrl, supaBaseAnonKey);

export const getImageUrl = (name: string | null) => {
  const { data } = supabase.storage
    .from("belanja")
    .getPublicUrl(`public/brands/${name}`);
  return data.publicUrl;
};

export const uploadFile = async (
  file: File,
  path: "brands" | "products" = "brands",
) => {
  const fileType = file.type.split("/")[1];
  const fileName = `${path}-${file.name.split(".")[0]}-${Date.now()}.${fileType}`;
  await supabase.storage
    .from("belanja")
    .upload(`public/${path}/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return fileName;
};

export const deleteFile = async (
  fileName: string | null,
  path: "brands" | "products" = "brands",
) => {
  const { error, data } = await supabase.storage
    .from("belanja")
    .remove([`public/${path}/${fileName}`]);

  if (error) {
    console.error("Error deleting file:", error);
  } else {
    console.log("File deleted successfully");
  }
  return { error, data };
};
