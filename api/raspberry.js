const { NEXT_PUBLIC_API_ENDPOINT } = process.env;

const fetcher = (url) => fetch(url).then((res) => res.json()).catch(error => ({error}));

const getRpi = () => fetcher(`${ NEXT_PUBLIC_API_ENDPOINT }/rpi/`)

const togglePin = ( { number, isActive } ) => fetcher(
    `${ NEXT_PUBLIC_API_ENDPOINT }/rpi/${ number }`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify( { isActive: !isActive } )
    })

const toggleAll = ( isActive ) => fetcher(
    `${ NEXT_PUBLIC_API_ENDPOINT }/rpi`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify( { isActive } )
    });

export default {
    getRpi,
    togglePin,
    toggleAll,
}