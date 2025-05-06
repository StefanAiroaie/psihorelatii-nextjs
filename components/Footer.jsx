import { navigation } from "../consts"

export default function Example() {
    return (
        <footer className="bg-zinc-950">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">

                <p className="mb-10 text-center text-sm/6 text-gray-400">
                    &copy; {new Date().getFullYear()} psihorelatii.ro, Toate drepturile rezervate.
                </p>
                <nav aria-label="Footer" className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6">
                    {navigation.legal?.map((item) => (
                        <a key={item.name} href={item.href} className="text-gray-400 hover:text-white">
                            {item.name}
                        </a>
                    ))}
                </nav>
                <nav aria-label="Footer" className="mt-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6">
                    {navigation.header?.map((item) => (
                        <a key={item.name} href={item.href} className="text-gray-400 hover:text-white">
                            {item.name}
                        </a>
                    ))}
                </nav>
                <nav aria-label="Footer" className="mt-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6">
                    {navigation.categories?.map((item) => (
                        <a key={item.name} href={item.href} className="text-gray-400 hover:text-white">
                            {item.name}
                        </a>
                    ))}
                </nav>


            </div>

        </footer>
    )
}
