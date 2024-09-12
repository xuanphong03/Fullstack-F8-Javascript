import logoCoinbase from '../../../../assets/images/logo_coinbase.svg';
import logoSpotify from '../../../../assets/images/logo_spotify.svg';
import logoPinterest from '../../../../assets/images/logo_pinterest.svg';
import logoGoogle from '../../../../assets/images/logo_google.svg';
import logoAmazon from '../../../../assets/images/logo_amazon.svg';
import logoNetflix from '../../../../assets/images/logo_netflix.svg';

function MyAwesomeClients() {
  const AwesomeClientsList = [
    { name: 'coinbase', thumbnail: logoCoinbase },
    { name: 'spotify', thumbnail: logoSpotify },
    { name: 'pinterest', thumbnail: logoPinterest },
    { name: 'google', thumbnail: logoGoogle },
    { name: 'amazon', thumbnail: logoAmazon },
    { name: 'netflix', thumbnail: logoNetflix },
  ];
  return (
    <section className="py-28">
      <h2 className="mb-8 text-center font-sans font-semibold leading-relaxed tracking-normal text-gray-900 antialiased">
        My awesome clients
      </h2>
      <ul className="flex items-center justify-center gap-5">
        {AwesomeClientsList.map(({ name, thumbnail }) => (
          <li className="w-40" key={name}>
            {' '}
            <img src={thumbnail} alt={name} className="aspect-2/1 w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MyAwesomeClients;
