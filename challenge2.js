async function getApiKey(name) {
  var mHeaders = new Headers({
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      'Connection': 'keep-alive'
  });

  var mBody = JSON.stringify({
      "candidate_name": name
  })

  var  options = {
      method: 'POST',
      headers: mHeaders,
      body: mBody,
  };

  var response = await fetch('//fasttrack-smartly.herokuapp.com/', options);
  var json = await response.json();
  console.log(json);

  return json.apikey_value;
}


async function postSubmit(name, key) {
  var mHeaders = new Headers({
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      'Connection': 'keep-alive',
      'authorization': 'Basic ' + btoa(name + ':' + key)
  });

  var  options = {
      method: 'POST',
      headers: mHeaders,
      body: JSON.stringify({
          reply: `My name is Zaw Mai. Thanks for reaching out. I'm happy to help. It seems like one of the ad named ""Easy, Effective & Enjoyable..." is paused. I resumed the ad and it should be delivering now. Please review your campaign. Is there anything else I can help you with?`
      })
  };

  var response = await fetch('//fasttrack-smartly.herokuapp.com/reply', options);
  var json = await response.json();
  console.log(json);

  return json.status;
}


async function main() {
  var name = 'zawmai';
  var key =  'fbdcf30b-25a9-4418-92fe-bddf93b6b42b';
  await postSubmit(name, key);
  
}

main();

// moreInterestingStuff = {
//   help: 'You should explore me more',
//   submit: '/sfqmz',
//   scenario: `jnbhjof.uibu.pof.pg.pvs.vtfst.ibe.bo.jttvf.xjui.pof.pg.uifjs.gbdfcppl.bet.opu.efmjwfsjoh?.boe.uibu.zpv.ibwf.gpvoe.uif.sppu.dbvtf.up.cf.uif.njtdpogjhvsfe.be.tubuvt.(jo.tnbsumz,jp't.ebubcbtf).uibu.zpv.gpvoe.fbsmjfs.jo.uif.mjtu.pg.bet?.xijdi.zpv.fwfouvbmmz.gjyfe.xjui.uif.qvu.sfrvftu,`,
//   userMessage: `ij?.j'n.hfuujoh.sfbmmz.gsvtusbufe.xjui.uijt.beaa.tpnfipx.ju't.kvtu.opu.efmjwfsjoh.po.gbdfcppl.boe.j.offe.up.mjwf.zftufsebz,.qmfbtf?.dbo.zpv.ifmq!`,
//   instructions: `xsjuf.sfqmz.up.uif.vtfs.up.fyqmbjo.uif.tjuvbujpo.bt.cftu.zpv.dbo?.bttvnjoh.uibu.uif.vtfs.jt.opo-ufdiojdbm?.boe.tvcnju.uif.sfqmz,`,
// }