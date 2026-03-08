const getPaginationOptions = (page, limit) => {
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  
  const skip = (pageNum - 1) * limitNum;
  
  return {
    skip,
    take: limitNum,
    page: pageNum,
    limit: limitNum,
  };
};

const formatPaginatedResponse = (data, totalItems, pageNum, limitNum) => {
  return {
    items: data,
    meta: {
      totalItems,
      currentPage: pageNum,
      totalPages: Math.ceil(totalItems / limitNum),
      itemsPerPage: limitNum,
    }
  };
};

module.exports = {
  getPaginationOptions,
  formatPaginatedResponse,
};
