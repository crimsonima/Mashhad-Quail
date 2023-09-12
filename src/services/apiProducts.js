import supabase, { supabaseUrl } from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}

export async function createEditProduct(newProduct, id) {
  const hasImagepath = newProduct.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newProduct.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagepath
    ? newProduct.image
    : `${supabaseUrl}/storage/v1/object/public/products/${imageName}`;

  // create/edit product
  let query = supabase.from("products");

  //1.create
  if (!id) query = query.insert([{ ...newProduct, image: imagePath }]);
  //2.edit'
  if (id)
    query = query.update({ ...newProduct, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Products could not be created");
  }

  //upload image
  if (hasImagepath) return data;
  const { error: storageError } = await supabase.storage
    .from("products")
    .upload(imageName, newProduct.image);

  // delete the product if storage err
  if (storageError) {
    await supabase.from("products").delete().eq("id", data.id);
    console.error(error);
    throw new Error("Products image could not be uploaded");
  }

  return data;
}

export async function deleteProduct({ productId: id, image }) {
  //delete product row
  const { data, error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Products could not be deleted");
  }

  //delete product image from database
  const { error: imageError } = await supabase.storage
    .from("products")
    .remove([
      image.replace(
        "https://acffttidxbtonwprxvzf.supabase.co/storage/v1/object/public/products/",
        ""
      ),
    ]);

  if (imageError) {
    console.log(imageError);
    throw new Error("Product Image Could not be deleted from database");
  }

  return data;
}
