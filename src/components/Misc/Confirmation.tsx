const Confirmation = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="flex glass w-full h-full z-40 fixed left-0 top-0 items-center">
            <div className="bg-black-background w-full xl:w-1/3 h-content mx-auto p-6 flex flex-col gap-12">
                <div className="flex justify-between">
                    <div className="text-center w-full">
                        <h1 className="text-white font-SF-Pro font-bold text-xl xl:text-3xl">Are you sure you want to</h1>
                        <h1 className="text-white font-SF-Pro font-semibold xl:text-xl">{message}?</h1>
                    </div>
                    <button onClick={onCancel}><i className="fa-solid hover:text-action-hover transition-all fa-xmark fa-2x"></i></button>
                </div>
                <div className="flex justify-around gap-12 text-white font-bold font-SF-Pro text-3xl">
                    <button onClick={onConfirm} className="bg-green-600 w-full py-2 rounded hover:bg-green-500 transition-all">Yes</button>
                    <button onClick={onCancel} className="bg-rose-400 w-full py-2 rounded hover:bg-rose-300 transition-all">No</button>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;