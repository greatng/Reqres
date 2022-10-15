const PageNumber = ({ pageNumber, currentPage, handlePageChange }) => {
  return (
    <div>
      {pageNumber &&
        pageNumber.map((page, idx) => {
          return (
            <button key={idx}
              className={
                'page-number ' + (page + 1 === currentPage ? 'page-active' : '')
              }
              onClick={() => {
                handlePageChange(page + 1);
              }}
              disabled={page + 1 === currentPage}
            >
              {page + 1}
            </button>
          );
        })}
    </div>
  );
};

export default PageNumber;
