import supabase, { supabaseUrl } from "./supabase";

export async function getCars() {
  const { data, error } = await supabase.from("cars").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cars data could not be loaded");
  }
  return data;
}

export async function deleteCar(id) {
  const { data, error } = await supabase.from("cars").delete().eq("id", id);
  if (error) throw new Error("Car cannot be deleted");
  return data;
}

// https://ivvbiugnjmmvrjumnmft.supabase.co/storage/v1/object/public/car-inages//Audi-A5.png

export async function createEditCar(newCar, id) {
  //if it does, meaning we ahve an image else we will add
  const hasImagePath = newCar.image?.startsWith?.(supabaseUrl);

  //create image name
  const imageName = `${Math.random()}-${newCar.image.name}`.replaceAll("/", "");
  //create image path
  const imagePath = hasImagePath
    ? newCar?.image
    : `${supabaseUrl}/storage/v1/object/public/car-inages/${imageName}`;

  //if id is not there, means we are creating a new car
  let query = supabase.from("cars");
  //to create
  if (!id) query = query.insert([{ ...newCar, image: imagePath }]);
  // for edit
  if (id)
    query = query
      .update({ ...newCar, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) throw new Error("Car cannot be created");

  //upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("car-inages")
    .upload(imageName, newCar.image);

  // 3. if file is not uplaod correctly, then delete that car upload
  if (storageError) {
    await supabase.from("cars").delete().eq("id", data.id);
    console.log("Storage Error");
    throw new Error("Car image could not be upload. Car was not created!");
  }

  return data;
}
