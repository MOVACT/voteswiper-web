import { useRouter } from 'next/router';
import React from 'react';

const ShareImage: React.FC = () => {
  const router = useRouter();

  // 168px
  // 58

  return (
    <div className="">
      <div className="h-32 px-8 pt-10">
        <div className="font-medium text-white opacity-80">
          Mein WahlSwiper-Ergebnis für die
        </div>
        <div className="text-2xl font-medium text-white">
          {router.query.election && router.query.election}
        </div>
      </div>
      <div className="px-8 pb-10">
        {router.query['score[]'] &&
          (router.query['score[]'] as string[]).map((score) => {
            const values = score.split(',');

            return (
              <div key={score} className="pt-[10px]">
                <div className="block w-full focus-default h-12 bg-[#8186D7] rounded shadow-lg overflow-hidden relative">
                  <div
                    className="h-12 rounded bg-brand-pink shadow-right"
                    style={{ width: values[1] + '%' }}
                  />

                  <div className="absolute inset-0 flex items-center justify-between px-4 font-medium text-white">
                    <span>{values[0]}</span>

                    <div className="flex items-center">
                      <span>
                        {Intl.NumberFormat(router.locale).format(
                          parseFloat(parseFloat(values[1]).toFixed(1))
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShareImage;
