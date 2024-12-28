
const Pagination = ({ currentPage, totalPage, handlePageChange }) => {
    const pages = []
    for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
    }
    const handlePrev = () => {
        if (currentPage > 1) {
            window.scrollTo(0, 0);
            handlePageChange(currentPage - 1)
        }
    }
    const handleNext = () => {
        if (currentPage < totalPage) {
            window.scrollTo(0, 0);
            handlePageChange(currentPage + 1)
        }
    }
    return (
        <div>
            <div className="join mt-10 flex justify-center gap-1">
                <div>
                    <button onClick={handlePrev} className="join-item btn btn-outline bg-blue-700 text-white">Previous page</button>
                </div>
                <div>
                    {
                        pages.map(page => <input onClick={() => handlePageChange(page)} key={page} className={`join-item btn btn-square`} type="radio" name="options" aria-label={`${page}`} disabled={page === currentPage} />)
                    }
                </div>
                <div>
                    <button onClick={handleNext} className="join-item btn btn-outline bg-blue-700 text-white">Next</button>
                </div>

            </div>
        </div>
    );
};

export default Pagination;