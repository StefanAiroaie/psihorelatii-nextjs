'use client'
import { navigation } from '../consts'
import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    Bars3Icon,

    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'



export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (



        <>
            {/* Header */}
            <header className="bg-light shadow-lg sticky top-0 py-4 z-20 text-dark">
                {/* Desktop Nav */}
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <a href="/" className="justify-center items-center">
                        <img
                            src="/logo.png"
                            alt="Logo epilare definitiva"
                            width={300}
                            height={100}
                        />
                    </a>


                    <div className="flex lg:hidden justify-end">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="w-7 h-7" aria-hidden="true" />
                        </button>
                    </div>
                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        <nav className="flex gap-8">
                            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                                {/* blog categories */}
                                <Popover className="relative">
                                    <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                                        Informatii pe categorii
                                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                                    </PopoverButton>

                                    <PopoverPanel
                                        transition
                                        className="absolute top-full -left-8 z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                                    >
                                        {navigation.categories.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="block rounded-lg px-3 py-2 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </PopoverPanel>
                                </Popover>

                                {/* links pages */}
                                {navigation.header.map((subLink, j) => (
                                    <a
                                        key={j}
                                        href={subLink.href}
                                        className="text-sm/6 font-semibold text-dark hover:text-accent transition"
                                    >
                                        {subLink.name}
                                    </a>
                                ))}


                            </PopoverGroup>
                        </nav>
                        {/* Call to Action */}

                    </div>
                </div >

                {/* Mobile NAV */}
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            {/* Logo Mobile Menu */}
                            <a href="/" className="justify-center items-center">
                                <img
                                    src="/logo.png"
                                    alt="Logo epilare definitiva"
                                    width={300}
                                    height={100}
                                />
                            </a>
                            {/* Close Button*/}
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        {/* Nav */}
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <Disclosure as="div" className="-mx-3">
                                        <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                            Informatii pe categorii
                                            <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />
                                        </DisclosureButton>
                                        <DisclosurePanel className="mt-2 space-y-2">
                                            {[...navigation.categories,].map((item, index) => (
                                                <DisclosureButton
                                                    key={`${item?.name}-${index}`}
                                                    as="a"
                                                    href={item.href}
                                                    className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                                                >
                                                    {item.name}
                                                </DisclosureButton>
                                            ))}
                                        </DisclosurePanel>
                                    </Disclosure>

                                    {/* header links */}
                                    {navigation.header.map((subLink, j) => (
                                        <Popover key={j} className=" flex w-full items-center justify-between rounded-lg text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                            <a
                                                href={subLink.href}
                                                className="flex justify-center font-semibold hover:text-accent transition"
                                            >
                                                {subLink.name}
                                            </a>
                                        </Popover>
                                    ))}


                                </div>
                                <div className="py-6 flex justify-center" >
                                    {/* call to action */}

                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header >




        </>
    )




}
