export const getTransactionType = async () => {
   const res = await fetch("https://api.smile-indonesia.id/transaction-types", {
      headers: new Headers({ Authorization: process.env.NEXT_PUBLIC_TOKEN }),
   });

   const data = await res.json();
   return data.list;
};
