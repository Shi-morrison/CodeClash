function ProfileInfo(){
    let profileInfo = "py-4 px-[1px] md:px-4 lg:px-4";
    return {
        view: () => (
            <div className="flex flex-row w-[30vw]">
                <div className="flex flex-col">
                    <div className={profileInfo}>Games Played</div>
                    <div className="px-[1px] md:px-4 lg:px-4">Number</div>
                </div>
                <div className="flex flex-col">
                    <div className={profileInfo}>Games Won</div>
                    <div>Number</div>
                </div>
                <div className="flex flex-col">
                    <div className={profileInfo}>Games Lost</div>
                    <div>Number</div>
                </div>
                <div className="flex flex-col">
                    <div className={profileInfo}>W/L</div>
                    <div className="pr-[1px]">Decimal Number</div>
                </div>
            </div>
        )
    }
}

export default ProfileInfo;