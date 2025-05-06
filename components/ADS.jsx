const ADS = ({ }) => {

    return (
        <>
            {/* ads */}
            <section className=' flex flex-col justify-center items-center p-8 gap-8'>
                {/* ad mobile */}
                <div className="flex items-center justify-center bg-accent text-white text-sm font-semibold w-[336px] h-[280px] md:hidden">
                    Ad mobile
                </div>
                {/* ad desktop */}
                <div className="hidden md:flex items-center justify-center bg-accent text-white text-sm font-semibold w-[728px] h-[90px]">
                    Ad Desktop
                </div>
            </section>
        </>

    );
}
export default ADS