const AdminPanel = () => {
    return (
        <div className="w-full mt-1 h-96">
            <div className="flex flex-col bg-black-container w-full h-full">
                <form className="flex flex-col items-center mt-6">
                    <div className="flex">
                        <input className="text-3xl p-2 font-SF-Pro text-white bg-black-container border-2 border-black-background focus:outline-none" placeholder="Username..." type="text"></input>
                        <button className="font-SF-Pro text-white text-2xl px-6 border-black-background border-2 hover:bg-purple-interact">Search</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminPanel;