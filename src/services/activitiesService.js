export const getActivity = async () => {
   const res = await fetch(
      "https://api.smile-indonesia.id/v2/master-activities",
      {
         headers: new Headers({ Authorization: process.env.NEXT_PUBLIC_TOKEN }),
      },
   );

   const data = await res.json();
   return data.list;
};
