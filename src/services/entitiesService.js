export const getEntities = async (keyword) => {
   const res = await fetch(
      "https://api.smile-indonesia.id/entities?" +
         new URLSearchParams({
            page: 1,
            paginate: 10,
            status: 1,
            keyword,
         }).toString(),
      {
         headers: new Headers({ Authorization: process.env.NEXT_PUBLIC_TOKEN }),
      },
   );

   const data = await res.json();
   return data.list;
};
