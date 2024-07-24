import { NextResponse } from "next/server";

export async function GET(req, res) {
   const { searchParams } = new URL(req.url);
   const entity_id = searchParams.get("entity_id");
   const activity_id = searchParams.get("activity_id");

   const cities = [
      // Add more cities as needed
   ];

   // const filteredCities = cities.filter((city) =>
   //    city.name.toLowerCase().includes(query.toLowerCase()),
   // );

   return NextResponse.json({
      data: [
         { materialName: "Test", availableStock: 200 },
         { materialName: "Test 2", availableStock: 300 },
      ],
   });
}
export const getMaterial = async (params) => {
   const res = await fetch('https://api.smile-indonesia.id/v2/stocks?' + new URLSearchParams({
      page: 1,
      paginate: 1000,
      entity_id: params.entity_id,
      activity_id: params.activity_id,
   }).toString(), {
      headers: new Headers({ 'Authorization': process.env.NEXT_PUBLIC_TOKEN })
   })

   const data = await res.json();
   return data.list;
}