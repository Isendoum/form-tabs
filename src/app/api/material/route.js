import { NextResponse } from "next/server";

export async function GET(req, res) {
   const { searchParams } = new URL(req.url);
   const entity_id = searchParams.get("entity_id");
   const activity_id = searchParams.get("activity_id");

   const data = [
      {
         materialName: "Test",
         availableStock: 200,
         entity_id: 429,
         activity_id: 1,
      },
      {
         materialName: "Test 2",
         availableStock: 300,
         entity_id: 278,
         activity_id: 2,
      },
      {
         materialName: "Test 3",
         availableStock: 300,
         entity_id: 429,
         activity_id: 1,
      },
      {
         materialName: "Test 4",
         availableStock: 400,
         entity_id: 278,
         activity_id: 1,
      },
      {
         materialName: "Test 5",
         availableStock: 500,
         entity_id: 429,
         activity_id: 1,
      },
      {
         materialName: "Test 6",
         availableStock: 600,
         entity_id: 278,
         activity_id: 2,
      },
   ];

   const filteredData = data.filter(
      (item) =>
         item.entity_id === parseInt(entity_id) &&
         item.activity_id === parseInt(activity_id),
   );

   return NextResponse.json({
      data: filteredData,
   });
}
