function Navbar(){
    return {
        view: () => (
            <div className="invisible md:visible text-white flex justify-between px-32">
                <div>Hola</div>
                <div>Profile</div>
            </div>
        )
    }
}

export default Navbar;