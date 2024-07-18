import { NextResponse } from "next/server";

export async function GET(req, res) {
   const { searchParams } = new URL(req.url);
   const query = searchParams.get("query");

   if (!query || query?.length < 3) {
      return NextResponse.json({ cities: [] });
   }

   const cities = [
      { id: 1, name: "New York" },
      { id: 2, name: "Los Angeles" },
      { id: 2, name: "Los Alamos" },
      { id: 3, name: "Chicago" },
      { id: 4, name: "Houston" },
      { id: 5, name: "Phoenix" },
      { id: 6, name: "Paris" },
      { id: 7, name: "London" },
      // Add more cities as needed
   ];

   const filteredCities = cities.filter((city) =>
      city.name.toLowerCase().includes(query.toLowerCase()),
   );

   return NextResponse.json({ data: filteredCities });
}
