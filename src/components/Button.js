function Button({children, classList, type="button", href=null, onclick=null, border = false, fill = false}) {

    return (
        fill ?
        <button onClick={onclick} type={type} className={`transition-all ease-in px-6 py-4 rounded-[8px] outline-0 text-white bg-black ${classList}`}>
            {children}
        </button>
            :
        <button onClick={onclick} type={type} className={`transition-all ease-in px-6 py-4 rounded outline-0 border-${border !== false ? border : "none"} ${classList}`}>
            {children}
        </button>
    )
}

export default Button;
