import Head from 'next/head';
import Image from 'next/image';

// Node SDK, not able to run on in the browser

import { v2 as cloudinary } from 'cloudinary';

import styles from '../styles/Home.module.css';

import crew from '../data/crew';
const { allegiances, members } = crew;

export async function getStaticProps() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
  });

  const cardWidth = 864;
  const cardHeight = 1200;
  const cardFrameSize = 50;
  const avatarWidth = cardWidth - ( cardFrameSize * 2 ) - ( 35 * 2 );
  const avatarHeight = 500;

  const cards = members.map(member => {
    return cloudinary.url('white', {
      width: cardWidth,
      height: cardHeight,
      border: `${cardFrameSize}px_solid_rgb:1C80CD`,
      transformation: [
        {
          fetch_format: 'auto',
          quality: 'auto',
        },

        // Background

        {
          overlay: 'white',
          width: cardWidth - ( cardFrameSize * 2 ),
          height: cardHeight - ( cardFrameSize * 2 ),
        },
        {
          flags: 'layer_apply',
          gravity: 'north_west',
          x: 0,
          y: 0,
          effect: 'colorize',
          color: '#B1E4FF',
        },

        // Icon

        {
          overlay: {
            url: allegiances.find(({ id }) => id === member.allegiance)?.image
          },
          width: 74,
          height: 74,
          crop: 'fill',
          border: `5px_solid_rgb:FFAC01`,
          radius: 'max'
        },
        {
          flags: 'layer_apply',
          gravity: 'north_west',
          x: 35,
          y: 20,
        },

        // Name

        {
          overlay: {
            font_family: 'Source Sans Pro',
            font_size: 44,
            font_weight: 'black',
            text: member.name.toUpperCase()
          },
          crop: 'fit'
        },
        {
          flags: 'layer_apply',
          gravity: 'north_west',
          x: 135,
          y: 45,
        },

        // Date

        {
          overlay: {
            font_family: 'Source Sans Pro',
            font_size: 30,
            font_weight: 'semibold',
            text: member.date.toUpperCase()
          },
          crop: 'fit'
        },
        {
          flags: 'layer_apply',
          gravity: 'north_east',
          x: 35,
          y:  54,
        },

        // Avatar

        {
          overlay: {
            url: member.image
          },
          width: avatarWidth - 20,
          height: avatarHeight,
          crop: 'fill',
          gravity: 'faces',
          border: '10px_solid_rgb:FFAC01'
        },

          // Bio

          {
            overlay: {
              font_family: 'Source Sans Pro',
              font_size: 30,
              font_weight: 'semibold',
              text: member.bio.toUpperCase(),
              line_spacing: 4
            },
            crop: 'fit',
            width: avatarWidth - 20
          },

          {
            flags: 'layer_apply',
            gravity: 'north_west',
            y: 'h + 35',
          },

          // First Appeared Title

          {
            overlay: {
              font_family: 'Source Sans Pro',
              font_size: 36,
              font_weight: 'black',
              text: 'First Appeared In'.toUpperCase(),
            },
            crop: 'fit'
          },

            // Line

            {
              overlay: 'white',
              width: 352,
              height: 5,
            },
            {
              flags: 'layer_apply',
              gravity: 'north_east',
              x: `0 - ${avatarWidth} + w`,
              y: 'h / 2 - 2',
              effect: 'colorize',
              color: 'rgb:1C80CD',
            },

          {
            flags: 'layer_apply',
            gravity: 'north_west',
            y: 'h + 38',
          },

          // First Appeared Value

          {
            overlay: {
              font_family: 'Source Sans Pro',
              font_size: 30,
              font_weight: 'semibold',
              text: member.firstAppeared.toUpperCase(),
            },
            crop: 'fit',
            width: avatarWidth - 20
          },
          {
            flags: 'layer_apply',
            gravity: 'north_west',
            y: 'h + 30',
          },

          // Aliases Title

          {
            overlay: {
              font_family: 'Source Sans Pro',
              font_size: 36,
              font_weight: 'black',
              text: 'Aliases'.toUpperCase(),
            },
            crop: 'fit',
            width: avatarWidth - 20
          },

            // Line

            {
              overlay: 'white',
              width: 535,
              height: 5,
            },
            {
              flags: 'layer_apply',
              gravity: 'north_east',
              x: `0 - ${avatarWidth} + w`,
              y: 'h / 2 - 2',
              effect: 'colorize',
              color: 'rgb:1C80CD',
            },

          {
            flags: 'layer_apply',
            gravity: 'north_west',
            y: 'h + 38',
          },

          // Aliases Value

          {
            overlay: {
              font_family: 'Source Sans Pro',
              font_size: 30,
              font_weight: 'semibold',
              text: (member.aliases.length > 0 ? member.aliases.join(', ') : 'None').toUpperCase(),
            },
            crop: 'fit',
            width: avatarWidth - 20
          },
          {
            flags: 'layer_apply',
            gravity: 'north_west',
            y: 'h + 30',
          },


        {
          flags: 'layer_apply',
          gravity: 'north_west',
          x: 35,
          y: 124,
        },

      ]
    })
  });

  return {
    props: {
      cards
    }
  }
}

export default function Home({ cards }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trading Card Generator</title>
        <meta name="description" content="Generate trading card deck with Cloudinary!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Trading Card Generator
        </h1>

        <div className={styles.grid}>
          {cards.map(card => {
            return <img key={card} key={card} src={card} alt="" />
          })}
        </div>
      </main>
    </div>
  )
}
