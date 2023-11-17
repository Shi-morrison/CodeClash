import m from "mithril"
function LikeButton() {

    let isHovered = false;
    let isActive = false;

    const handleMouseEnter = () => {
        isHovered = true;
        
    };

    const handleMouseLeave = () => {
        isHovered = false;
        isActive = false;
        
    };

    const handleClick = () => {
        isActive = !isActive;
        
    };
    return {
        view: () => (
            <>
                <svg 
                    width="38"
                    height="31.9"
                    viewBox="0 0 295 250"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class={`like-button ${isHovered ? "hovered" : ""} ${isActive ? "active" : ""}`}
                    onmouseenter={handleMouseEnter}
                    onmouseleave={handleMouseLeave}
                    onclick={handleClick}
                >
                    <rect y="91" width="24" height="159" fill="#8DA29D"/>
                    <rect x="45" y="91" width="23" height="159" fill="#8DA29D"/>
                    <rect x="24" y="91" width="28" height="24" fill="#8DA29D"/>
                    <rect x="19" y="227" width="26" height="23" fill="#8DA29D"/>
                    <rect x="91" y="91" width="23" height="136" fill="#8DA29D"/>
                    <rect x="114" y="227" width="136" height="23" fill="#8DA29D"/>
                    <rect x="114" y="68" width="22" height="23" fill="#8DA29D"/>
                    <rect x="136" y="45" width="24" height="23" fill="#8DA29D"/>
                    <rect x="160" width="22" height="45" fill="#8DA29D"/>
                    <rect x="182" width="46" height="23" fill="#8DA29D"/>
                    <rect x="205" y="23" width="23" height="68" fill="#8DA29D"/>
                    <rect x="182" y="68" width="91" height="23" fill="#8DA29D"/>
                    <rect x="273" y="91" width="22" height="114" fill="#8DA29D"/>
                    <rect x="250" y="205" width="23" height="22" fill="#8DA29D"/>
                </svg>


            </>
        ),
    };
}

export default LikeButton;