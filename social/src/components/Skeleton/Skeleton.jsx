import React from 'react'
import Skeleton from 'react-loading-skeleton';

const SkeletonLoading = () => {
  return (
    <>
      <div className="col-md-4 shop-item mb-5">
        <Skeleton height={345} />
        <div className="mt-2 mb-2">
          <Skeleton height={18} />
        </div>
        <Skeleton height={2} />

        <Skeleton height={25} width={130} />
        <Skeleton height={30} width={100} />
      </div>
    </>
  );
}

export default SkeletonLoading;

