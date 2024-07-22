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
