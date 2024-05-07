
const ProfileComponent = ({username, level}: {username: string, level: number}) => {

    return (
        <div className="w-full mt-1">
            <div className="bg-indigo-500 w-full h-48 lg:h-96"></div>
            <div className="flex justify-between relative bg-black-container w-full lg:h-40 h-20 mt-1 px-5">
                <div className="flex lg:gap-10 gap-2">
                    <div className="relative rounded-full bottom-3/4 lg:bottom-[120%] bg-pink-300 lg:w-80 lg:h-80 w-32 h-32"></div>
                    <div className="flex flex-col lg:gap-1 place-content-center w-auto">
                        <h1 className="text-lg lg:text-5xl font-bold font-SF-Pro text-white">{username}</h1>
                        <h1 className="text-sm lg:text-2xl font-SF-Pro text-white">LVL {Math.floor(level/100)}</h1>
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full bg-green-400 lg:w-3 lg:h-3 w-2 h-2"></div>
                            <span className="text-sm lg:text-2xl font-SF-Pro text-white">Active - playing game</span>
                        </div>
                    </div>
                </div>
                <div className="flex content-start gap-5 mt-6">
                    <button className="h-8 w-32 hidden lg:block bg-purple-interact text-xl font-bold font-SF-Pro text-white hover:bg-action-hover hover:text-black transition-all">Follow</button>
                    <button className="h-8 w-32 hidden lg:block bg-purple-interact text-xl font-bold font-SF-Pro text-white hover:bg-action-hover hover:text-black transition-all">Friend</button>
                    <a className="flex items-center h-8 w-3"><i className="mx-auto fa-solid fa-lg fa-ellipsis-vertical hover:text-action-hover transition-all"></i></a>

                </div>
            </div>
        </div>
    );
}

export default ProfileComponent