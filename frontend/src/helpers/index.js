import axios from "axios";

export const pinJSONToIPFS = async (json) => {
    console.log("I am here",json);
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

    const config={
        method:"post",
        url:"https://api.pinata.cloud/pinning/pinJSONToIPFS",
        headers:{
            'Content-Type':'application/json',
            'pinata_api_key':process.env.NEXT_PUBLIC_PINATA_API_KEY,
            'pinata_secret_api_key':process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY
        },
        data:json
    }

    const res= await axios(config);
    return res.data.IpfsHash;
};
