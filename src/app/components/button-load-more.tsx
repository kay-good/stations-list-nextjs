import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ButtonMore() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    let currentPage = Number(searchParams.get('page')) || 1;

    function changePage() {
        const params = new URLSearchParams(searchParams)
        params.set('page', `${currentPage += 1}`)
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <button className='bg-white py-5 px-7 rounded-full mx-auto font-bold cursor-pointer hover:bg-gray-100' onClick={changePage}>Load more {'>'}</button>
    )
}