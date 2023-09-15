import blessed from 'blessed';
import promptSync from 'prompt-sync'; 
import chalk, { Chalk } from 'chalk';
import net from 'net';
import fs from 'fs';
import dns from 'dns';


const screen = blessed.screen()
const prompt = promptSync();

const switchToHomepage = () => {

  loadingBox.setContent('');

  const homepageScreen = blessed.screen();

  const homepageBox = blessed.box({
    top: 'center',
    left: 'center',
    width: '80%',
    height: '70%',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      border: {
        fg: 'cyan'
      }
    }
  });

  homepageBox.setContent(`
  {cyan-fg}     __    __              __            _______             __                     {/cyan-fg}
{cyan-fg}     /  \\  /  |            /  |          /       \\           /  |                    {/cyan-fg}
{cyan-fg}     $$  \\ $$ |  ______   _$$ |_         $$$$$$$  | __    __ $$ |  _______   ______  {/cyan-fg}
{cyan-fg}     $$$  \\$$ | /      \\ / $$   |        $$ |__$$ |/  |  /  |$$ | /       | /      \\ {/cyan-fg}
{cyan-fg}     $$$$  $$ |/$$$$$$  |$$$$$$/         $$    $$/ $$ |  $$ |$$ |/$$$$$$$/ /$$$$$$  |{/cyan-fg}
{cyan-fg}     $$ $$ $$ |$$    $$ |  $$ | __       $$$$$$$/  $$ |  $$ |$$ |$$      \\ $$    $$ |{/cyan-fg}
{cyan-fg}     $$ |$$$$ |$$$$$$$$/   $$ |/  |      $$ |      $$ \\__$$ |$$ | $$$$$$  |$$$$$$$$/ {/cyan-fg}
{cyan-fg}     $$ | $$$ |$$       |  $$  $$/       $$ |      $$    $$/ $$ |/     $$/ $$       |{/cyan-fg}
{cyan-fg}     $$/   $$/  $$$$$$$/    $$$$/        $$/        $$$$$$/  $$/ $$$$$$$/   $$$$$$$/ {/cyan-fg}                                                                                                                                      
  `);


  const optionsList = blessed.list({
    parent: homepageBox,
    width: '100%-4',
    height: '50%',
    top: '50%',
    left: 'center',
    keys: true, 
    tags: true,
    items: ['Port Scan', 'Sub Domain Search', 'Reverse DNS Search'],
    border: {
      type: 'line'
    },
    style: {
      fg: 'cyan',
      selected: {
        bg: 'cyan',
        fg: 'white'
      },
      border: {
        fg: 'cyan'
      }
    }
  });

  optionsList.on('select', (item) => {
    if (item.getText() === 'Port Scan') {
      portscan()
    } else if (item.getText() === 'Sub Domain Search') {
      subdomain()

    } else if (item.getText() === 'Reverse DNS Search') {
      dnssearch()

    }
    
    
    homepageBox.setContent('');
    screen.render();
  });

  function dnssearch() {

    homepageScreen.destroy();

    console.log(chalk.cyan(`
    __    __              __            _______             __                     
    /  \\  /  |            /  |          /       \\           /  |                    
    $$  \\ $$ |  ______   _$$ |_         $$$$$$$  | __    __ $$ |  _______   ______  
    $$$  \\$$ | /      \\ / $$   |        $$ |__$$ |/  |  /  |$$ | /       | /      \\ 
    $$$$  $$ |/$$$$$$  |$$$$$$/         $$    $$/ $$ |  $$ |$$ |/$$$$$$$/ /$$$$$$  |
    $$ $$ $$ |$$    $$ |  $$ | __       $$$$$$$/  $$ |  $$ |$$ |$$      \\ $$    $$ |
    $$ |$$$$ |$$$$$$$$/   $$ |/  |      $$ |      $$ \\__$$ |$$ | $$$$$$  |$$$$$$$$/ 
    $$ | $$$ |$$       |  $$  $$/       $$ |      $$    $$/ $$ |/     $$/ $$       |
    $$/   $$/  $$$$$$$/    $$$$/        $$/        $$$$$$/  $$/ $$$$$$$/   $$$$$$$/ 
                                                                                                                                                                   
                                                                           
    `));


    const ipAddress = prompt(chalk.cyan(`Enter IpAddress: `)); 

dns.reverse(ipAddress, (err, hostnames) => {
  if (err) {
    console.error(chalk.cyan(`\nReverse DNS lookup failed: ${err.message}`));
  } else {
    console.log(chalk.cyan(`\nReverse DNS lookup result for ${ipAddress}:`));
    hostnames.forEach((hostname, index) => {
      console.log(chalk.cyan(`\nHostname ${index + 1}: ${hostname}`));
    });
  }
});
    

  }

  function subdomain() {

    homepageScreen.destroy();

    console.log(chalk.cyan(`
    __    __              __            _______             __                     
    /  \\  /  |            /  |          /       \\           /  |                    
    $$  \\ $$ |  ______   _$$ |_         $$$$$$$  | __    __ $$ |  _______   ______  
    $$$  \\$$ | /      \\ / $$   |        $$ |__$$ |/  |  /  |$$ | /       | /      \\ 
    $$$$  $$ |/$$$$$$  |$$$$$$/         $$    $$/ $$ |  $$ |$$ |/$$$$$$$/ /$$$$$$  |
    $$ $$ $$ |$$    $$ |  $$ | __       $$$$$$$/  $$ |  $$ |$$ |$$      \\ $$    $$ |
    $$ |$$$$ |$$$$$$$$/   $$ |/  |      $$ |      $$ \\__$$ |$$ | $$$$$$  |$$$$$$$$/ 
    $$ | $$$ |$$       |  $$  $$/       $$ |      $$    $$/ $$ |/     $$/ $$       |
    $$/   $$/  $$$$$$$/    $$$$/        $$/        $$$$$$/  $$/ $$$$$$$/   $$$$$$$/ 
                                                                                                                                                                   
                                                                           
    `));
    
    const domain = prompt(chalk.cyan(`Enter Domain: `));
    

    const subdomains = [
      'www',
      'blog',
      'shop',
      'mail',
      'dev',
      'smtp',
      'pop',
      'imap',
      'ftp',
      'admin',
      'dev',
      'test',
      'staging',
      'demo',
      'api',
      'cdn',
      'app',
      'secure',
      'vpn',
      'forum',
      'chat',
      'store',
      'support',
      'portal',
      'dashboard',
      'analytics',
      'billing',
      'crm',
      'login',
      'register',
      'signin',
      'signup',
      'download',
      'upload',
      'assets',
      'images',
      'static',
      'media',
      'files',
      'docs',
      'doc',
      'wiki',
      'help',
      'faq',
      'contact',
      'about',
      'info',
      'news',
      'events',
      'forum',
      'status',
      'jobs',
      'careers',
      'partners',
      'blog',
      'press',
      'policy',
      'terms',
      'privacy',
      'legal',
      'sitemap',
      'search',
      'm',
      'mobile',
      'en',
      'es',
      'fr',
      'de',
      'au',
      'ca',
      'uk',
      'us',
      'eu',
      'asia',
      'jp',
      'cn',
      'br',
      'mx',
      'ru',
      'kr',
      'in',
      'ae',
      'sa',
      'tr',
      'gr',
      'it',
      'nl',
      'se',
      'no',
      'fi',
      'dk',
      'ch',
      'at',
      'es',
      'pt',
      'pl',
      'cz',
      'hu',
      'ro',
      'bg',
      'ua',
      'kz',
      'th',
      'vn',
      'sg',
      'my',
      'ph',
      'id',
      'ng',
      'za',
      'eg',
      'ke',
      'ma',
      'ar',
      'cl',
      'pe',
      'co',
      've',
      'ec',
      'bo',
      'py',
      'uy',
  
    ];
    



    function resolveSubdomain(subdomain) {
      return new Promise((resolve, reject) => {
        dns.resolve(`${subdomain}.${domain}`, (err, addresses) => {
          if (err) {
            console.log(chalk.cyan(`\nSubdomain ${subdomain}.${domain} does not exist.`));
            resolve(null);
          } else {
           
            resolve(addresses);
          }
        });
      });
    }
    
   
    async function searchSubdomains() {
      for (const subdomain of subdomains) {
        const addresses = await resolveSubdomain(subdomain);
        if (addresses) {
          console.log(chalk.cyan(`\nSubdomain ${subdomain}.${domain} exists. IP addresses: ${addresses.join(', ')}`));
        }
      }
    }

    searchSubdomains();
    

    

  



  }
























  function portscan() {
 
    homepageScreen.destroy();
  

    const resultScreen = blessed.screen();
  

    const resultBox = blessed.scrollablebox({
      width: '100%',
      height: '100%',
      tags: true,
      border: {
        type: 'line',
      },
      style: {
        fg: 'white',
        border: {
          fg: 'cyan',
        },
      },

      content: `
        {cyan-fg}     __    __              __            _______             __                     {/cyan-fg}
        {cyan-fg}     /  \\  /  |            /  |          /       \\           /  |                    {/cyan-fg}
        {cyan-fg}     $$  \\ $$ |  ______   _$$ |_         $$$$$$$  | __    __ $$ |  _______   ______  {/cyan-fg}
        {cyan-fg}     $$$  \\$$ | /      \\ / $$   |        $$ |__$$ |/  |  /  |$$ | /       | /      \\ {/cyan-fg}
        {cyan-fg}     $$$$  $$ |/$$$$$$  |$$$$$$/         $$    $$/ $$ |  $$ |$$ |/$$$$$$$/ /$$$$$$  |{/cyan-fg}
        {cyan-fg}     $$ $$ $$ |$$    $$ |  $$ | __       $$$$$$$/  $$ |  $$ |$$ |$$      \\ $$    $$ |{/cyan-fg}
        {cyan-fg}     $$ |$$$$ |$$$$$$$$/   $$ |/  |      $$ |      $$ \\__$$ |$$ | $$$$$$  |$$$$$$$$/ {/cyan-fg}
        {cyan-fg}     $$ | $$$ |$$       |  $$  $$/       $$ |      $$    $$/ $$ |/     $$/ $$       |{/cyan-fg}
        {cyan-fg}     $$/   $$/  $$$$$$$/    $$$$/        $$/        $$$$$$/  $$/ $$$$$$$/   $$$$$$$/ {/cyan-fg}
        {cyan-fg}\nThis process may take some minutes as it's scanning more than 65,000 ports\nPress ESC to go back to the homepage{/cyan-fg}
        {cyan-fg} \nYou need very stable internet-connection while running this.{/cyan-fg}
        {cyan-fg} \nPort Results:{/cyan-fg}
        `,
        
      alwaysScroll: true,
      alwaysScroll: true, 
  scrollbar: {
    ch: ' ', 
    style: {
      bg: 'cyan',
    },
  },
});



resultScreen.key(['up', 'down', 'pageup', 'pagedown'], (ch, key) => {
  if (key.name === 'up') {
    resultBox.scroll(-1); 
  } else if (key.name === 'down') {
    resultBox.scroll(1); 
  } else if (key.name === 'pageup') {
    resultBox.scroll(-resultBox.height + 1); 
  } else if (key.name === 'pagedown') {
    resultBox.scroll(resultBox.height - 1); 
  }
  resultScreen.render(); 
});
  
    
    resultScreen.key(['escape', 'q', 'C-c'], () => {
      resultScreen.destroy();
      switchToHomepage(); 
    });
  
   
    resultScreen.append(resultBox);
  

    resultScreen.render();
  
    
    console.log(chalk.cyan(`
    __    __              __            _______             __                     
    /  \\  /  |            /  |          /       \\           /  |                    
    $$  \\ $$ |  ______   _$$ |_         $$$$$$$  | __    __ $$ |  _______   ______  
    $$$  \\$$ | /      \\ / $$   |        $$ |__$$ |/  |  /  |$$ | /       | /      \\ 
    $$$$  $$ |/$$$$$$  |$$$$$$/         $$    $$/ $$ |  $$ |$$ |/$$$$$$$/ /$$$$$$  |
    $$ $$ $$ |$$    $$ |  $$ | __       $$$$$$$/  $$ |  $$ |$$ |$$      \\ $$    $$ |
    $$ |$$$$ |$$$$$$$$/   $$ |/  |      $$ |      $$ \\__$$ |$$ | $$$$$$  |$$$$$$$$/ 
    $$ | $$$ |$$       |  $$  $$/       $$ |      $$    $$/ $$ |/     $$/ $$       |
    $$/   $$/  $$$$$$$/    $$$$/        $$/        $$$$$$/  $$/ $$$$$$$/   $$$$$$$/ 
                                                                                  
                                                                                  
                                                                                  
  
    `));
  

    const userInputValue = prompt(chalk.cyan(`Enter IP: `));
    const target = userInputValue;
    const startPort = 1;
    const endPort = 65535;
  
    const openPorts = []; 

    checkPort2()
    function checkPort2(port) {
      const client = new net.Socket(); 
      let port2 = 25565
  
      client.connect(port2, target, () => {
      
        openPorts.push(port); 
        client.destroy(); 
  
        
        resultBox.content += `{cyan-fg} Port ${port} is open {/cyan-fg}\n`;
        resultScreen.render(); 
        saveOpenPortToFile(userInputValue, port);
  
       
        
      });
  
      client.on('error', (err) => {
        client.destroy();
      });
    }
  
  
    
  
  
    
    function checkPort(port) {
      const client = new net.Socket();
  
      client.connect(port, target, () => {
      
        openPorts.push(port);
        client.destroy(); 
  
        
        resultBox.content += `{cyan-fg} Port ${port} is open {/cyan-fg}\n`;
        resultScreen.render(); 
        saveOpenPortToFile(userInputValue, port);
  
       
       
      });
  
      client.on('error', (err) => {
        client.destroy();
      });
    }
  
    
    for (let port = startPort; port <= endPort; port++) {
      checkPort(port);
    }
  
  
  
  function saveOpenPortToFile(userInputValue, port) {
    const filename = `${userInputValue}_openports.txt`;
    const data = `${port}\n`;

    fs.appendFile(filename, data, (err) => {
      if (err) {

      } else {

      }
    });
  }
}
  
  homepageScreen.key(['escape', 'q', 'C-c'], () => {
    homepageScreen.destroy();
    screen.render();
  });

  
  homepageScreen.append(homepageBox);

  
  homepageScreen.render();
};


const loadingBox = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: 5,
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: 'cyan'
    }
  }
});


const progressBar = blessed.progressbar({
    parent: loadingBox,
    width: '70%', 
    height: 1,
    top: 2,
    left: 'center', 
    filled: 0,
    orientation: 'horizontal',
    style: {
      fg: 'cyan',
      bg: 'black',
      bar: {
        bg: 'cyan'
      }
    }
  });
  


loadingBox.setContent('Booting-Up...Net-Pulse..( Made by AdiKan )');


screen.append(loadingBox);


let progress = 0;
const updateProgressBar = () => {
  progressBar.setProgress(progress);
  screen.render();
  progress += 10;
};



const interval = setInterval(() => {
  if (progress <= 100) {
    updateProgressBar();
  } else {
    clearInterval(interval);
    switchToHomepage(); 
  }
}, 1000);


screen.render();
