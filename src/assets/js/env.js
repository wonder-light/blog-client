let publicKey = '-----BEGIN PUBLIC KEY-----' +
                'MIIBHDANBgkqhkiG9w0BAQEFAAOCAQkAMIIBBAKB/A3rAql3Cr5jHsOmAbgT+/I/' +
                'qcKuRTpicrYOAZp4IN2T/JyI0jyEZG9LacisnPKJM6WtwqOFlSQrSQWftb/+iqq6' +
                'hsqY6vbYrNb7KfbnYwNLk0zIoYxLW28WTdRcwaFtY56YH+J2V3LHZgla97Oh3Eq/' +
                'M3Rl7IZfEDSHPF5PEC0kKkux3Z9mfwSg0KW09Wj+UH5gr78AD95JkKwC38Tll4Ep' +
                'bab9UZAMnfk6D5lNKKgSUTsfn4U0YNdLblkVN99EssH69a8+LC1dCUIgPiCBkLOn' +
                '3zT5TZ4Fp02rae4UxnFPdLPWIrgeu4UPxmGxgUvz4sdoINTmPP7Q99zkbQIDAQAB' +
                '-----END PUBLIC KEY-----';
let privateKey = '-----BEGIN PRIVATE KEY-----' +
                 'MIIEVQIBADANBgkqhkiG9w0BAQEFAASCBD8wggQ7AgEAAoHrAs24Hj3zaoI4FhvD' +
                 'SRh7Wj3pyVPuUq36v2LgO9k+yDQfmELCBOAJ03dZxe0t+lc+2HeVYjZe7qop9ooI' +
                 'hN2ceyMi74KvM9jiFW6frL0Zb4LXjeTC0tlikzKo8WR9UnzoryuQwV5D2+iKxYA+' +
                 'j+nmQ90Xlxt+59+L5aIU/i6zHjTyZ4Ooo2K2phZJPON/0geEkfZXdAnsxEP0lxVq' +
                 '8B7ZVjuo0EElTxsGhUBv+S744EGoXdN4bjDtUj5lqkRYPr9JpMBKfq2/a8JKvCCP' +
                 'SysVhWZVI553NaTyvH0sQMp2VGJpTtETlHlDqwWv6QIDAQABAoHrALScHKAiXS8f' +
                 'xhB+eCp9AByMdGl2k7/MVdUf8G+e6OqU+M/z2x412s0x/ijNZS4HVpnhMbHU+eJA' +
                 'ZRYfRrAt7J7O787HIBj368TG0cVUXUdjzwU+MakasUgSU4yiLNvaAhrIdqCuGuzN' +
                 '3x2CoNyPYYyFnzUAHamxqD2hs11DG2WttWEL/VjofoGuF+s4dICvay+hUonyFDdJ' +
                 '2T+A3+myQzG3iyrJr5KGVvop8zJQgOEJ4RutaR/Zz9HSr6sNBIwRcW4ul1GjtADH' +
                 'cwOhUOvRdkfMXRJwYHwWkgC08fchT53WRw0TEn7T6QtJwQJ2Ab2mABGYymAY3Z+O' +
                 'yxOllWf4/JCKs68MQxgGjNKH6rCF/3ssr2XdSA37uaJUBG/4ze3LkJEGJXJsOFwS' +
                 'dP3tD8/ICi7JpKif1dQVfdWgh38edIMmjq7loPrNLT5p/BHUtensDa04wHX6ofM8' +
                 '5mThMNx/Bei/hQJ2AZxKFMOuC7ZpMLz8Xm2hmNzI2Pzy+lBTBvBswseZHIP8b5Ma' +
                 'Op4ydE3t3Zu11IkiqFpHSd2oFTz1KsKV8DLjxf1CGMDm0WzUyqH3xs5ZqLIm7pvK' +
                 'Bmc59H5bECxZGodliuZRaFm/Le85dzaEcFF3AYqpk04yFQJ2AWyLoD7Ex7d4X8Kn' +
                 '4kM+DkuxB5mNfJLS6wd6RDPr7vVbh7PQx+IB83FM23uIUuDtnDbLcITRjExfbnMS' +
                 'vhUBmQ+VSY8gb8tohFgrBHZ+DJjV5uVp4wn62YaP1FTcCdDkObMS39U1OWrJDTWW' +
                 'ObmH5JpaZhEQqQJ1GgnHs/ALB1MvY9AgepYJHHCG27rQuj/0IT0NNCPkXCWWOlke' +
                 'uJ0BIWbTZyEdsieBMGpuLNSPutDVCYMEr4IZH/yLqasqMNBjl8UZRjD9aXrx+N7S' +
                 'drR/T3ea1uItvb1Y/2DG0Vw0n3YmpEfK/Coi68n35qldAnYBSZovoBZs1j5iyHun' +
                 'CsE/g9pjZRHNNeD7ATwSqvtWokHde3d/FYFgj/ld+PBU3AhrNC6qVNcLyvbGH5kZ' +
                 'jvevyc+TiIb2KsxoA9wUiFbrTj5R2Lw+D3Soyxcnws37XIAXjqb0K5+r0mH24kF4' +
                 '0TopbdS/LFE6' +
                 '-----END PRIVATE KEY-----';

const env = {
    id: 12234526152101,
    serverUrl: import.meta.env.VITE_Server_Url,
    isDev: import.meta.env.VITE_Is_Development === "true",
    publicKey,
    privateKey
};

export default env;














