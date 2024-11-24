let currentYear = new Date().getFullYear()

function footer() {

    return (
        <footer className="h-5v bg-bgColor dark:bg-darkBgColor text-textColor dark:text-darkTextColor px-4 flex justify-between">
            <p className="text-left text-sm">Hsu</p>
            <p className="text-right text-sm">Copyright <span>&copy;</span> {currentYear}. Alright Reserved.</p>
        </footer>
    )
}

export default footer;
