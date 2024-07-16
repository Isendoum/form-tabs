import { NextResponse } from "next/server";

export async function GET(req, res) {
   const { searchParams } = new URL(req.url);
   const query = searchParams.get("country");

   const states = [
      { id: 1, country: 1, name: "New York" },
      { id: 2, country: 1, name: "California" },
      { id: 3, country: 1, name: "New Mexico" },
      { id: 4, country: 2, name: "Vancouver" },
      { id: 5, country: 2, name: "Other" },
      // Add more cities as needed
   ];

   const filteredStates = states.filter((state) =>
      state.country.toString().toLowerCase().includes(query.toLowerCase()),
   );

   return NextResponse.json({ options: filteredStates });
}
