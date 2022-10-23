import classNames from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import { Image } from 'react-datocms'

import { LinkData } from '../LinkData'

import { EffectFade, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useMediaQuery } from '../../hooks/useMediaQuery'

export const ContentBannerL: FC<{
  links: LinkData[]
}> = ({ links }) => {
  const deviceSize = useMediaQuery()

  return (
    <div className="hero-banner is-large">
      <Swiper
        modules={[Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-container',
          type: 'bullets',
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop
        centeredSlides={false}
      >
        {links.map((link) => (
          <SwiperSlide key={link.id} style={{ height: 'unset' }}>
            <div className="columns is-vcentered position-relative is-justify-content-space-between mx-0">
              <div className="column hero-banner-content content-lg is-12">
                <div
                  className={classNames('columns is-flex Large', {
                    'is-flex-direction-column': deviceSize === 'mobile',
                  })}
                >
                  <div
                    className={classNames(
                      'columns column is-flex is-flex-grow-1',
                      {
                        'is-flex-direction-row': deviceSize == 'desktop',
                        'is-flex-direction-column': deviceSize !== 'fullhd',
                      },
                    )}
                  >
                    {link.title && (
                      <div
                        className={classNames('column title-wrap', {
                          'is-4': deviceSize == 'fullhd',
                        })}
                      >
                        <div className="title is-3">{link.title}</div>
                      </div>
                    )}
                    {link.description && (
                      <div className="column content has-text-light">
                        {link.description}
                      </div>
                    )}
                  </div>
                  <div
                    className={classNames('column', {
                      'is-flex is-flex-grow-0 is-justify-content-end':
                        deviceSize !== 'mobile',
                    })}
                  >
                    <Link href={link.url || ''}>
                      <a>
                        <button className="button is-primary">
                          {link.callToAction}
                        </button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="column image-lg is-12">
                {link.imageLg && (
                  <Image
                    data={link.imageLg}
                    lazyLoad={false}
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="50% 50%"
                  />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination-container" />
    </div>
  )
}