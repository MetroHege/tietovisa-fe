const CookiePolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 text-left">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Evästekäytännöt
      </h1>
      <h2 className="text-xl mb-2 text-gray-900 dark:text-white">
        1. Evästeet ja muut vastaavat tekniikat
      </h2>
      <p className="mb-4 text-gray-900 dark:text-white">
        Eväste on käyttäjän selaimelle lähetettävä pieni tekstitiedosto, joka
        yleensä sisältää tunnistenumeron, eikä vahingoita selainta eikä
        päätelaitetta.
      </p>
      <p className="mb-4 text-gray-900 dark:text-white">
        Käytämme evästeitä (”cookies”) ja muita vastaavia tekniikoita
        kävijäliikenteen tilastointiin ja palvelumme käytön toteuttamiseen.
        Selvitämme muun muassa, miten käyttäjät ovat liikkuneet palvelussa ja
        mitä sivuja he ovat avanneet ja koska. Selvitämme myös teknisiä
        laitetietoja kuten selaimia, käyttöjärjestelmää ja IP-osoitetta.
      </p>
      <p className="mb-4 text-gray-900 dark:text-white">
        Emme yritä emmekä voi tunnistaa käyttäjää pelkkien evästeiden avulla.
        Jos käyttäjä rekisteröi tunnuksen ja kertoo sähköpostiosoitteen, voimme
        saada käyttäjästä lisää tunnistetietoja. Käyttäjän tunnistaminen
        edellyttää kuitenkin pääsääntöisesti sitä, että käyttäjä ottaa itse
        yhteyttä erikseen ja kertoo tunnistettavia tietoja itsestään.
      </p>
      <p className="mb-6 text-gray-900 dark:text-white">
        Osa evästeistä on kolmansien osapuolien kuten
        mainosteknologiatoimittajien ja sosiaalisen median palvelujen evästeitä.
        Ne käsittelevät evästeitä rekisterinpitäjinä omiin tarkoituksiinsa.
      </p>
      <h2 className="text-xl mb-2 text-gray-900 dark:text-white">
        2. Välttämättömät evästeet
      </h2>
      <p className="mb-6 text-gray-900 dark:text-white">
        Käytämme välttämättömiä evästeitä palvelumme toteuttamiseen ja
        kehittämiseen. Näitä palvelun toimintoja ovat muun muassa
        rekisteröityminen ja tulosten tallentaminen. Keräämme myös
        tilastotietoja palvelun käytöstä.
      </p>
      <h2 className="text-xl mb-2 text-gray-900 dark:text-white">
        3. Mainosten ja sosiaalisen median upotusten evästeet
      </h2>
      <p className="mb-4 text-gray-900 dark:text-white">
        Palvelussamme on kolmansien osapuolten mainoksia ja niissä linkkejä
        palvelumme ulkopuolisiin verkkosivustoihin. Nämä mainokset latautuvat
        palveluumme kyseisten palveluiden omilta palvelimilta.
      </p>
      <p className="mb-4 text-gray-900 dark:text-white">
        Kolmannet osapuolet saattavat lisätä evästeitä käyttäjien selaimiin ja
        lukea niitä tai kerätä tietoja evästeiden ja muiden verkkojäljitteiden
        avulla. Esimerkkinä tästä ovat Googlen mainokset. Käyttäjät voivat lukea
        niistä lisää tästä linkistä:{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          className=" text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Miten Google käyttää palvelujamme käyttäviltä sivustoilta ja
          sovelluksista saatavia tietoja
        </a>
      </p>
      <p className="mb-4 text-gray-900 dark:text-white">
        Palvelussamme oleviin kolmansien osapuolten palveluihin ja mainoksiin
        sovelletaan kyseisten kolmansien osapuolten käyttö- ja muita ehtoja.
        Tällöin nämä kolmannet osapuolet käsittelevät tietoja
        rekisterinpitäjinä.
      </p>
      <p className="mb-6 text-gray-900 dark:text-white">
        Jos palveluumme tulee sosiaalisen median liitännäisiä, niiden kautta
        tallentuu tietoa käyttäjän vierailusta palvelussamme sosiaalisen median
        palveluntarjoajalle. Näin ei kuitenkaan aina tapahdu, jos käyttäjä ei
        itse jaa sisältöä liitännäisen kautta.
      </p>
      <h2 className="text-xl mb-2 text-gray-900 dark:text-white">
        4. Suostumuksen antaminen
      </h2>
      <p className="mb-4 text-gray-900 dark:text-white">
        Palvelumme käyttäjä antaa suostumuksensa evästetietojen tallentamiseen
        ja keräämiseen palvelumme käyttämän ponnahdusikkunan kautta. Käyttäjä
        voi muuttaa antamaansa suostumusta. Jos otamme käyttöön uuden evästeiden
        käyttötarkoituksen, kysymme evästeluvat uudelleen.
      </p>
    </div>
  );
};

export default CookiePolicy;
