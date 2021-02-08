/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { Category, Thread } from 'modmail-types';
import axios, { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { FG, Nullable, Optional, MutatedThread } from '../types';
import { MembersState } from './index';

type State = FG.State.NavigationState;

const TEST_CATEGORIES = JSON.parse(
    `[{"channelID":"806363000357257276","emojiID":"🎯","guildID":"806083557352144916","id":"806363218724388871","isActive":true,"name":"Penetration Testing"}]`
);

const TEST_THREADS = JSON.parse(
    `[{"author":{"id":"194024167052410880"},"channel":"807405214860574720","id":"807405216663207936","isActive":false,"messages":[{"clientID":"807405191632257025","content":"Bobs the word, I need another ID","edits":[],"files":[],"isDeleted":false,"modmailID":"807405218886451262","sender":"194024167052410880","internal":false,"threadID":"807405216663207936"}],"category":"806363218724388871"},{"author":{"id":"806086102711795745"},"channel":"807023261514858506","id":"807023263665487872","isActive":false,"messages":[{"clientID":"807023208364507178","content":"t","edits":[],"files":[],"isDeleted":false,"modmailID":"807023266111815721","sender":"806086102711795745","internal":false,"threadID":"807023263665487872"}],"category":"806363218724388871"},{"author":{"id":"806086102711795745"},"channel":"806832976926867456","id":"806832979941916711","isActive":false,"messages":[{"clientID":"806833011432620052","content":" t","edits":[],"files":[],"isDeleted":false,"modmailID":"806833010493620234","sender":"201600394353311744","internal":false,"threadID":"806832979941916711"}],"category":"806363218724388871"},{"author":{"id":"806086102711795745"},"channel":"806832312088002580","id":"806832315530608678","isActive":false,"messages":[{"clientID":"806832399912140891","content":"t","edits":[],"files":[],"isDeleted":false,"modmailID":"806832400688611358","sender":"806086102711795745","internal":false,"threadID":"806832315530608678"}],"category":"806363218724388871"},{"author":{"id":"806086102711795745"},"channel":"806827793706123265","id":"806827797199847461","isActive":false,"messages":[],"category":"806363218724388871"},{"author":{"id":"806086102711795745"},"channel":"806827058075795486","id":"806827061397291044","isActive":false,"messages":[{"clientID":"806827110592806992","content":" test","edits":[],"files":[],"isDeleted":false,"modmailID":"806827109740707860","sender":"201600394353311744","internal":false,"threadID":"806827061397291044"},{"clientID":"806827121799725067","content":"test","edits":[],"files":[],"isDeleted":false,"modmailID":"806827188069859338","sender":"806086102711795745","internal":false,"threadID":"806827061397291044"}],"category":"806363218724388871"},{"author":{"id":"806086102711795745"},"channel":"806826626578251786","id":"806826629862129699","isActive":false,"messages":[{"clientID":"806826624690946058","content":"hi","edits":[],"files":[],"isDeleted":false,"modmailID":"806826697353592873","sender":"806086102711795745","internal":false,"threadID":"806826629862129699"},{"clientID":"806826658933374976","content":"t","edits":[],"files":[],"isDeleted":false,"modmailID":"806826699349295104","sender":"806086102711795745","internal":false,"threadID":"806826629862129699"},{"clientID":"806826737177460796","content":" t","edits":[],"files":[],"isDeleted":false,"modmailID":"806826736129015838","sender":"201600394353311744","internal":false,"threadID":"806826629862129699"},{"clientID":"806826850134917150","content":"t","edits":[],"files":[],"isDeleted":false,"modmailID":"806826851028566056","sender":"806086102711795745","internal":false,"threadID":"806826629862129699"}],"category":"806363218724388871"},{"author":{"id":"806086102711795745"},"channel":"806826305127186492","id":"806826310935642146","isActive":false,"messages":[{"clientID":"806826305223786528","content":"test","edits":[],"files":[],"isDeleted":false,"modmailID":"806826362702135307","sender":"806086102711795745","internal":false,"threadID":"806826310935642146"},{"clientID":"806826445191249922","content":"test","edits":[],"files":[],"isDeleted":false,"modmailID":"806826448044163115","sender":"806086102711795745","internal":false,"threadID":"806826310935642146"},{"clientID":"806826541820149790","content":" t","edits":[],"files":[],"isDeleted":false,"modmailID":"806826539248779284","sender":"201600394353311744","internal":false,"threadID":"806826310935642146"}],"category":"806363218724388871"},{"author":{"id":"806086102711795745"},"channel":"806826122997268511","id":"806826126650507297","isActive":false,"messages":[{"clientID":"806826167167615006","content":"hello","edits":[],"files":[],"isDeleted":false,"modmailID":"806826168048812052","sender":"806086102711795745","internal":false,"threadID":"806826126650507297"}],"category":"806363218724388871"},{"author":{"id":"477558125931790337"},"channel":"806460546613248000","id":"806460549566169120","isActive":false,"messages":[{"clientID":"806461192385462282","content":" https://cdn.discordapp.com/attachments/747806316990431248/806165428283375656/lamp.png","edits":[],"files":[],"isDeleted":false,"modmailID":"806461191437680670","sender":"262340466874384385","internal":false,"threadID":"806460549566169120"},{"clientID":null,"content":"finish","edits":[],"files":[],"isDeleted":false,"modmailID":"806462130709594132","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"finish","edits":[],"files":[],"isDeleted":false,"modmailID":"806462570587881493","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"finnish","edits":[],"files":[],"isDeleted":false,"modmailID":"806462688904609852","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"finnish","edits":[],"files":[],"isDeleted":false,"modmailID":"806462734887419964","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"finish","edits":[],"files":[],"isDeleted":false,"modmailID":"806462758245761054","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"cancel","edits":[],"files":[],"isDeleted":false,"modmailID":"806464964280713236","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":"806462760443576350","content":"","edits":[],"files":[],"isDeleted":false,"modmailID":"806462759311114240","sender":"262340466874384385","internal":false,"threadID":"806460549566169120"},{"clientID":null,"content":"test XDDDDDDDDDDDDDDDDDDDD","edits":[],"files":[],"isDeleted":false,"modmailID":"806462819180216352","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"finish","edits":[],"files":[],"isDeleted":false,"modmailID":"806462829481164831","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":"806462830982201345","content":"","edits":[],"files":[],"isDeleted":false,"modmailID":"806462830164312064","sender":"262340466874384385","internal":false,"threadID":"806460549566169120"},{"clientID":null,"content":"Ohhh","edits":[],"files":[],"isDeleted":false,"modmailID":"806462840809848832","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"finish","edits":[],"files":[],"isDeleted":false,"modmailID":"806462859033837619","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"Ok","edits":[],"files":[],"isDeleted":false,"modmailID":"806462931272335361","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"should I add it as a bug anyways, to have it on a list as \\"known bug\\"?","edits":[],"files":[],"isDeleted":false,"modmailID":"806463039078400030","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"Well actually, cant one jst check if \\"message\\" is =  only \\"finish\\"","edits":[],"files":[],"isDeleted":false,"modmailID":"806463270268829718","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"if so cancel","edits":[],"files":[],"isDeleted":false,"modmailID":"806463286174416896","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"Imma add it","edits":[],"files":[],"isDeleted":false,"modmailID":"806463342306787338","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"ahdashdjah finish","edits":[],"files":[],"isDeleted":false,"modmailID":"806464409295257630","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"kek","edits":[],"files":[],"isDeleted":false,"modmailID":"806464478413586442","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"finish","edits":[],"files":[],"isDeleted":false,"modmailID":"806464488094171177","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":"806464489415114763","content":"","edits":[],"files":[],"isDeleted":false,"modmailID":"806464488626454559","sender":"262340466874384385","internal":false,"threadID":"806460549566169120"},{"clientID":"806464511971426324","content":" DHAHJdha","edits":[],"files":[],"isDeleted":false,"modmailID":"806464511049596939","sender":"262340466874384385","internal":false,"threadID":"806460549566169120"},{"clientID":null,"content":"dasjdjaskfinish","edits":[],"files":[],"isDeleted":false,"modmailID":"806464560164634654","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"hdjad","edits":[],"files":[],"isDeleted":false,"modmailID":"806464671493390347","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"dasfa","edits":[],"files":[],"isDeleted":false,"modmailID":"806464673964228688","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"assda","edits":[],"files":[],"isDeleted":false,"modmailID":"806464675394224129","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"finish","edits":[],"files":[],"isDeleted":false,"modmailID":"806464682843045898","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":"806464684663373824","content":"","edits":[],"files":[],"isDeleted":false,"modmailID":"806464683908792320","sender":"262340466874384385","internal":false,"threadID":"806460549566169120"},{"clientID":null,"content":"hdjashdjas, finish","edits":[],"files":[],"isDeleted":false,"modmailID":"806464726037037076","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"sdhahdjsahd, finish","edits":[],"files":[],"isDeleted":false,"modmailID":"806464760975196210","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"finish","edits":[],"files":[],"isDeleted":false,"modmailID":"806464777479913542","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":"806464778863771649","content":"","edits":[],"files":[],"isDeleted":false,"modmailID":"806464778196353044","sender":"262340466874384385","internal":false,"threadID":"806460549566169120"},{"clientID":null,"content":"cancel","edits":[],"files":[],"isDeleted":false,"modmailID":"806464810790813706","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"hjsdahjsh","edits":[],"files":[],"isDeleted":false,"modmailID":"806464847234859028","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"cancel","edits":[],"files":[],"isDeleted":false,"modmailID":"806464859948580864","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"hmmm","edits":[],"files":[],"isDeleted":false,"modmailID":"806464871776518184","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"hdajshdajshdja cancel","edits":[],"files":[],"isDeleted":false,"modmailID":"806464935357448192","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"finish ahdsjahdjasd","edits":[],"files":[],"isDeleted":false,"modmailID":"806465001773989890","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":null,"content":"cancel","edits":[],"files":[],"isDeleted":false,"modmailID":"806465053900668938","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"},{"clientID":"806468969787424769","content":"Help","edits":[],"files":[],"isDeleted":false,"modmailID":"806468971083071518","sender":"477558125931790337","internal":false,"threadID":"806460549566169120"},{"clientID":"806469091044753469","content":" no","edits":[],"files":[],"isDeleted":false,"modmailID":"806469090041659393","sender":"201600394353311744","internal":false,"threadID":"806460549566169120"},{"clientID":null,"content":"😦","edits":[],"files":[],"isDeleted":false,"modmailID":"806469106442305537","sender":"262340466874384385","internal":true,"threadID":"806460549566169120"}],"category":"806363218724388871"},{"author":{"id":"477558125931790337"},"channel":"806459781757665290","id":"806459404001083423","isActive":false,"messages":[{"clientID":"806459433549955092","content":" https://tenor.com/view/godzilla-pixel-art-pixel-monster-stampede-gif-5329686","edits":[],"files":[],"isDeleted":false,"modmailID":"806459784970764326","sender":"262340466874384385","internal":false,"threadID":"806459404001083423"},{"clientID":null,"content":"finnish","edits":[],"files":[],"isDeleted":false,"modmailID":"806460174444789794","sender":"262340466874384385","internal":true,"threadID":"806459404001083423"},{"clientID":null,"content":"finish","edits":[],"files":[],"isDeleted":false,"modmailID":"806460204585320480","sender":"262340466874384385","internal":true,"threadID":"806459404001083423"},{"clientID":"806460206472757259","content":"","edits":[],"files":[],"isDeleted":false,"modmailID":"806460205445283891","sender":"262340466874384385","internal":false,"threadID":"806459404001083423"}],"category":"806363218724388871"},{"author":{"id":"806086102711795745"},"channel":"806445246526259253","id":"806445248736788503","isActive":false,"messages":[{"clientID":"806445224419262475","content":"pp","edits":[],"files":[],"isDeleted":false,"modmailID":"806445251195568128","sender":"806086102711795745","internal":false,"threadID":"806445248736788503"}],"category":"806363218724388871"},{"author":{"id":"201600394353311744"},"channel":"806444118959718421","id":"806444120980717590","isActive":false,"messages":[{"clientID":"806444096682983424","content":"-list","edits":[],"files":[],"isDeleted":false,"modmailID":"806444122936180746","sender":"201600394353311744","internal":false,"threadID":"806444120980717590"}],"category":"806363218724388871"},{"author":{"id":"151487707871182848"},"channel":"806442422392324106","id":"806442425571737621","isActive":false,"messages":[{"clientID":null,"content":"sup","edits":[],"files":[],"isDeleted":false,"modmailID":"806442471730184212","sender":"151487707871182848","internal":true,"threadID":"806442425571737621"},{"clientID":null,"content":"close","edits":[],"files":[],"isDeleted":false,"modmailID":"806442481053859860","sender":"151487707871182848","internal":true,"threadID":"806442425571737621"},{"clientID":null,"content":"Haha","edits":[],"files":[],"isDeleted":false,"modmailID":"806442500205182986","sender":"151487707871182848","internal":true,"threadID":"806442425571737621"}],"category":"806363218724388871"},{"author":{"id":"477558125931790337"},"channel":"806458931584303114","id":"806438879770050580","isActive":false,"messages":[{"clientID":"806439406650130432","content":" Test Admin 2 Usr","edits":[],"files":[],"isDeleted":false,"modmailID":"806458934256336928","sender":"201600394353311744","internal":false,"threadID":"806438879770050580"},{"clientID":null,"content":"Logging into account again xd","edits":[],"files":[],"isDeleted":false,"modmailID":"806458935950966824","sender":"477558125931790337","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"Why can I see this channel?","edits":[],"files":[],"isDeleted":false,"modmailID":"806458937419235338","sender":"477558125931790337","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"because why bother to limit it?","edits":[],"files":[],"isDeleted":false,"modmailID":"806458938827866142","sender":"201600394353311744","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"this is the test server","edits":[],"files":[],"isDeleted":false,"modmailID":"806458958562066453","sender":"201600394353311744","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"Oh true","edits":[],"files":[],"isDeleted":false,"modmailID":"806458959891398696","sender":"477558125931790337","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"I didn't get the dm","edits":[],"files":[],"isDeleted":false,"modmailID":"806458961406459974","sender":"477558125931790337","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"For mod to user","edits":[],"files":[],"isDeleted":false,"modmailID":"806458963154698260","sender":"477558125931790337","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"Hmmm","edits":[],"files":[],"isDeleted":false,"modmailID":"806458964560183346","sender":"477558125931790337","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"I got yours","edits":[],"files":[],"isDeleted":false,"modmailID":"806458984197783552","sender":"477558125931790337","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"read how you spelt the command","edits":[],"files":[],"isDeleted":false,"modmailID":"806458985640362005","sender":"201600394353311744","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"Omg","edits":[],"files":[],"isDeleted":false,"modmailID":"806458987079532554","sender":"477558125931790337","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"🤡","edits":[],"files":[],"isDeleted":false,"modmailID":"806458988111593503","sender":"477558125931790337","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"Ahaha","edits":[],"files":[],"isDeleted":false,"modmailID":"806458989985923112","sender":"477558125931790337","internal":true,"threadID":"806438879770050580"},{"clientID":"806439959405133844","content":" Test Mod2Usr","edits":[],"files":[],"isDeleted":false,"modmailID":"806459013923471370","sender":"262340466874384385","internal":false,"threadID":"806438879770050580"},{"clientID":"806440041831727114","content":" Test Mod2Usr","edits":[],"files":[],"isDeleted":false,"modmailID":"806459015365394492","sender":"262340466874384385","internal":false,"threadID":"806438879770050580"},{"clientID":"806440141857357884","content":"Usr2Staff","edits":[],"files":[],"isDeleted":false,"modmailID":"806459016422490126","sender":"477558125931790337","internal":false,"threadID":"806438879770050580"},{"clientID":"806441278463016981","content":"\\\\test","edits":[],"files":[],"isDeleted":false,"modmailID":"806459018444800020","sender":"477558125931790337","internal":false,"threadID":"806438879770050580"},{"clientID":"806441325993263115","content":"\\\\","edits":[],"files":[],"isDeleted":false,"modmailID":"806459019920932884","sender":"477558125931790337","internal":false,"threadID":"806438879770050580"},{"clientID":"806441554494619648","content":"\\\\!contact @everyone","edits":[],"files":[],"isDeleted":false,"modmailID":"806459043647979522","sender":"477558125931790337","internal":false,"threadID":"806438879770050580"},{"clientID":null,"content":"heheh","edits":[],"files":[],"isDeleted":false,"modmailID":"806459045527420959","sender":"262340466874384385","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"Kek","edits":[],"files":[],"isDeleted":false,"modmailID":"806459046512689163","sender":"201600394353311744","internal":true,"threadID":"806438879770050580"},{"clientID":"806442356039221308","content":" hi","edits":[],"files":[],"isDeleted":false,"modmailID":"806459047900741674","sender":"645665699200761889","internal":false,"threadID":"806438879770050580"},{"clientID":null,"content":"cancel","edits":[],"files":[],"isDeleted":false,"modmailID":"806459049461415936","sender":"151487707871182848","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"I cant spell","edits":[],"files":[],"isDeleted":false,"modmailID":"806459074689368104","sender":"262340466874384385","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"admin","edits":[],"files":[],"isDeleted":false,"modmailID":"806459075997990932","sender":"151487707871182848","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"KEK","edits":[],"files":[],"isDeleted":false,"modmailID":"806459077370576936","sender":"262340466874384385","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"Mod","edits":[],"files":[],"isDeleted":false,"modmailID":"806459079182123028","sender":"201600394353311744","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"wat","edits":[],"files":[],"isDeleted":false,"modmailID":"806459102833410049","sender":"201600394353311744","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"what","edits":[],"files":[],"isDeleted":false,"modmailID":"806459104557269012","sender":"151487707871182848","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"AAHAHAHAH","edits":[],"files":[],"isDeleted":false,"modmailID":"806459105496924221","sender":"262340466874384385","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"mY ALT","edits":[],"files":[],"isDeleted":false,"modmailID":"806459107305455656","sender":"151487707871182848","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"I guess it doesn't actually check if the role id exists","edits":[],"files":[],"isDeleted":false,"modmailID":"806459108478681109","sender":"201600394353311744","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"that's a problem","edits":[],"files":[],"isDeleted":false,"modmailID":"806459132529475645","sender":"151487707871182848","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"69","edits":[],"files":[],"isDeleted":false,"modmailID":"806459133594304533","sender":"201600394353311744","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"Mod","edits":[],"files":[],"isDeleted":false,"modmailID":"806459135196790795","sender":"201600394353311744","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"mm yes","edits":[],"files":[],"isDeleted":false,"modmailID":"806459136757334026","sender":"151487707871182848","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"bruh","edits":[],"files":[],"isDeleted":false,"modmailID":"806459138140930068","sender":"151487707871182848","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"<@!477558125931790337>","edits":[],"files":[],"isDeleted":false,"modmailID":"806459161692602369","sender":"262340466874384385","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"My alt account should not have access to bot commands right?","edits":[],"files":[],"isDeleted":false,"modmailID":"806459163261141003","sender":"262340466874384385","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"shouldn't","edits":[],"files":[],"isDeleted":false,"modmailID":"806459164875685888","sender":"201600394353311744","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"-list all","edits":[],"files":[],"isDeleted":false,"modmailID":"806459166012866571","sender":"201600394353311744","internal":true,"threadID":"806438879770050580"},{"clientID":"806444044402163753","content":" test","edits":[],"files":[],"isDeleted":false,"modmailID":"806459167425953823","sender":"477558125931790337","internal":false,"threadID":"806438879770050580"},{"clientID":null,"content":"Uhm","edits":[],"files":[],"isDeleted":false,"modmailID":"806459191484350524","sender":"477558125931790337","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"could you not test user filter in MY channel XDDDDDDDDDDDDDDD","edits":[],"files":[],"isDeleted":false,"modmailID":"806459192768462858","sender":"262340466874384385","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"\`!close\` <:rollfac:782028976263528458>","edits":[],"files":[],"isDeleted":false,"modmailID":"806459193716375565","sender":"201600394353311744","internal":true,"threadID":"806438879770050580"},{"clientID":"806444456239693874","content":" test","edits":[],"files":[],"isDeleted":false,"modmailID":"806459195099578369","sender":"477558125931790337","internal":false,"threadID":"806438879770050580"},{"clientID":null,"content":"Why can my alt account execute mod commands?","edits":[],"files":[],"isDeleted":false,"modmailID":"806459196715171840","sender":"262340466874384385","internal":true,"threadID":"806438879770050580"},{"clientID":"806444620438831114","content":" t","edits":[],"files":[],"isDeleted":false,"modmailID":"806459220651671602","sender":"806086102711795745","internal":false,"threadID":"806438879770050580"},{"clientID":null,"content":"Okay so it can reply?","edits":[],"files":[],"isDeleted":false,"modmailID":"806459222135930881","sender":"262340466874384385","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"I guess that's fine I guess","edits":[],"files":[],"isDeleted":false,"modmailID":"806459223541940226","sender":"201600394353311744","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"yee channel is hidden anyways usually","edits":[],"files":[],"isDeleted":false,"modmailID":"806459225269862470","sender":"262340466874384385","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"HAve I understood teh correctly if I send commands to bot in DM it should not answer at all?","edits":[],"files":[],"isDeleted":false,"modmailID":"806459226665779221","sender":"262340466874384385","internal":true,"threadID":"806438879770050580"},{"clientID":null,"content":"if im normal user","edits":[],"files":[],"isDeleted":false,"modmailID":"806459246480064533","sender":"262340466874384385","internal":true,"threadID":"806438879770050580"},{"clientID":"806446049354055680","content":"Help all","edits":[],"files":[],"isDeleted":false,"modmailID":"806459248019374154","sender":"477558125931790337","internal":false,"threadID":"806438879770050580"},{"clientID":"806446152072560650","content":"Close","edits":[],"files":[],"isDeleted":false,"modmailID":"806459249466802177","sender":"477558125931790337","internal":false,"threadID":"806438879770050580"},{"clientID":"806447220944928829","content":"PEE PEE POO POO CHECK","edits":[],"files":[],"isDeleted":false,"modmailID":"806459250980814908","sender":"262340466874384385","internal":false,"threadID":"806438879770050580"},{"clientID":"806450876834381824","content":"12u32139218931283","edits":[],"files":[],"isDeleted":false,"modmailID":"806459252536901642","sender":"262340466874384385","internal":false,"threadID":"806438879770050580"},{"clientID":"806455334272761866","content":"!srcreate test1","edits":[],"files":[],"isDeleted":false,"modmailID":"806459272157200394","sender":"262340466874384385","internal":false,"threadID":"806438879770050580"},{"clientID":"806457306489159681","content":" https://tenor.com/view/godzilla-pixel-art-pixel-monster-stampede-gif-5329686","edits":[],"files":[],"isDeleted":false,"modmailID":"806459273537519646","sender":"262340466874384385","internal":false,"threadID":"806438879770050580"},{"clientID":"806443046237503529","content":" %{8hiQHE;2F:!FrZmd9$;FbQDq7G=C,8.(yVzu9&;5pp.CM#p3JfCBiQ[(3c@k@4YDd]VwfDH$3}-?9$!_hp@pJC5ccJg;v&i:PnFGYk+r!SgNNd%@-.;[mu@Qh&@TPLg9(;;G.({yZ]KdH:K.D(iQCYapH6r#+&)W&w##8Q[Q9#M,i7Zp]Yz(wMK!XdC{QU?d5)7eetGyf[!}}ij/rk+kX]}nY!,A?{&3gCh[hQr&{-nv;$APZJv8H=5+YX-ABqk+i(EQHVK+X+).:[@gBGd=]LFc-=QH:[jHg3LxBXv,)R=rV=rZc(SQN+D(f,Qgtjz@A9(KWx%NA6cupyd5DHr*xVSKE%FfLa4,qS5U7DcBcZ7fZM)yF%K=Un$S5?H,j6$%M3hXRcLh/PG(E/ZCb&aw:UX$_mwn@gvkU[!r?}$UvhX#PGeg({ZjrED-jXU.t!.gz9g!BZFZka}WQ6Xm%SY!Xca#hn#n$U7whKkHd=jgxjDk=PZEUNw;KJ[+9:6ga7+AbBYB!XSkFyaPt5x7E&@waD/pL}+uMCc}@T#S?nT4YfeNaZkTFSY&T}JK22(bd.YhDw6?QQr4r=Kr-]m)xf{kvBYj_/f/B:+Xb&t5b9Zv4j}N7+iqW(x_4U[N{2,:t[3)irKqhp2)@8{#wT5+]gV}Zh]zYv5PHcR)KK,}C)Q:WFV!k(H3kTc:K8zG5S]SG&=c]dg}(d6()G=d25Hh!w+-Qr[$Mj$YFmb=tD5F%3]V%)_7D?n3uh%7q#3[}amy=[8i%.r}n--D5(V!+h,35!rGRKY]K_KZ&zc?)?uYy&et+::g(g(-g-{]V78V8+7MKPEdE;]n4ZX_x_8R!8@QYr.jxfh8$AEB-wc.9R[,G#8;(p&=!wmPpNCfZ;(St=i;ri2Q5M!_JyTLuLc$/4DvU!.BX}_S{wYKb[9/TZT?)pxR%!w=rjRh%a]!2q{WjN[Y7wcm.U@aB;_w_LT%FgyV+qHz8iH%yjKjAf%yX.nvk@w!QgU]eSNt3T[+:pBNKdY_w=eG2=a}#AZZq_k[4G6xJY2;{-iGJigk93JXNQU[}6DD=cTGK!R#5}Zq?m}SYrZukEXyn,2cqib=e;MbA%[#D=2EcZ4d$Uh#GnH{;Vr@bFvLpH3Uu465qHd(/jG8ezzRTUNgrnEf@dcWw8&jVfe7x+aSf)-#a!R[d(NQa#JqK_F+UGWk;y@j$RVN.yBYtR$$8..xS{MKF63P]_79kJ}HpdyFNCK9E!9#Nz7U#agP-q//EwwHHhgh6M/%W7?MBrD57KcvGg]#S;QqHXepTw=/&L:Tx$]zi8d9BEiF4ye_NYmaSS&Lh%B_vATA9i7CMFVQq-nSvf;iu;-U)&PyHT6/.jV,Tkt$}h&]cbFc-EnPWG&?KA]tej!FE,=#,W5{wk(NuTz/5Gh[C=)h7gRcy&2?AuPq={3.5.vHg+niu5wH&F]D/(de_P&-BmGTJq/mMyJ.pDdctZU_auf!.:KEY/v3Nk/eZ]2!P?5rGRKZ)Z36tz;gy3QhdERBwH/9ynG4Zv,6r49mH)Z=fTX7R;QgQG}Lhj3u}+f+}e+Vz{YXhMwua,?jx*TSHCtK/-}C.d6CFx?(X(XaLr?#(TE/VV}fP3S;;/fJh?:fF9VB{=uj,})hab.Kzxq5/tU[[xBZQU@$w2%dz3];#qM8+{g(p.jp:}$]{v,]/P{78.tUvuT_j9D&$.;z&Cmg,d4u#F)i_QZ3Rj5e(2}=U.2(D%Z#i!X[3+([/D!aKWuh.VVXhaw8kd+C29(r3cSYcLXL8/3a#.ryX(_Cpp!VaBSGA[3xcAfFjbLm#vb{r2D8M=VYXp!A7@%mbUfCL=GM2.vL;=!QJjt(6qfr!5S.{/dZx[Dn=mny5kb7;caXL{N&n(9!DNfi_Z?BF,XRXzxmFW2DGcEwGTdE3vCXg:LC6Fw6wBe7[eTyw(T=T@NQ/v!134564fsafysf","edits":[],"files":[],"isDeleted":false,"modmailID":"806459073377730580","sender":"201600394353311744","internal":false,"threadID":"806438879770050580"}],"category":"806363218724388871"},{"author":{"id":"262340466874384385"},"channel":"806437700361125898","id":"806437703125172243","isActive":false,"messages":[{"clientID":null,"content":"Mod to User Test","edits":[],"files":[],"isDeleted":false,"modmailID":"806437816779014164","sender":"262340466874384385","internal":true,"threadID":"806437703125172243"},{"clientID":"806437987881713724","content":" Mod to User Test","edits":[],"files":[],"isDeleted":false,"modmailID":"806437986613854208","sender":"262340466874384385","internal":false,"threadID":"806437703125172243"},{"clientID":"806438039139909653","content":"Respond test","edits":[],"files":[],"isDeleted":false,"modmailID":"806438039982702623","sender":"262340466874384385","internal":false,"threadID":"806437703125172243"}],"category":"806363218724388871"},{"author":{"id":"201600394353311744"},"channel":"806433560444928020","id":"806431785918529552","isActive":false,"messages":[{"clientID":"806433221436899328","content":"","edits":[],"files":[],"isDeleted":false,"modmailID":"806433222325567518","sender":"201600394353311744","internal":false,"threadID":"806431785918529552"},{"clientID":"806431838532796426","content":"test","edits":[],"files":[],"isDeleted":false,"modmailID":"806433563628797952","sender":"201600394353311744","internal":false,"threadID":"806431785918529552"},{"clientID":null,"content":"","edits":[],"files":[],"isDeleted":false,"modmailID":"806433564630581270","sender":"201600394353311744","internal":true,"threadID":"806431785918529552"},{"clientID":null,"content":"finish","edits":[],"files":[],"isDeleted":false,"modmailID":"806433566107500545","sender":"201600394353311744","internal":true,"threadID":"806431785918529552"},{"clientID":"806433028137156649","content":"","edits":[],"files":[],"isDeleted":false,"modmailID":"806433567818645514","sender":"201600394353311744","internal":false,"threadID":"806431785918529552"},{"clientID":"806433717483995166","content":" a","edits":[],"files":[],"isDeleted":false,"modmailID":"806433716515373086","sender":"201600394353311744","internal":false,"threadID":"806431785918529552"},{"clientID":"806433932685606912","content":"r","edits":[],"files":[],"isDeleted":false,"modmailID":"806433933410697236","sender":"201600394353311744","internal":false,"threadID":"806431785918529552"},{"clientID":null,"content":"r","edits":[],"files":[],"isDeleted":false,"modmailID":"806433971046580235","sender":"201600394353311744","internal":true,"threadID":"806431785918529552"},{"clientID":null,"content":"r a","edits":[],"files":[],"isDeleted":false,"modmailID":"806433987546447903","sender":"201600394353311744","internal":true,"threadID":"806431785918529552"},{"clientID":"806433999244361728","content":"r a","edits":[],"files":[],"isDeleted":false,"modmailID":"806433999752790027","sender":"201600394353311744","internal":false,"threadID":"806431785918529552"},{"clientID":"806434032073048084","content":"close","edits":[],"files":[],"isDeleted":false,"modmailID":"806434032766156821","sender":"201600394353311744","internal":false,"threadID":"806431785918529552"}],"category":"806363218724388871"},{"author":{"id":"201600394353311744"},"channel":"806413850764247040","id":"806413853469573134","isActive":false,"messages":[{"clientID":null,"content":"asdfg","edits":[],"files":[],"isDeleted":false,"modmailID":"806414358120759297","sender":"201600394353311744","internal":true,"threadID":"806413853469573134"},{"clientID":"806414379770839081","content":"asdfg","edits":[],"files":[],"isDeleted":false,"modmailID":"806414378566942732","sender":"201600394353311744","internal":false,"threadID":"806413853469573134"}],"category":"806363218724388871"},{"author":{"id":"201600394353311744"},"channel":"806366066179571722","id":"806366067978010635","isActive":false,"messages":[{"clientID":"806366047879561266","content":"asd","edits":[],"files":[],"isDeleted":false,"modmailID":"806366070021160970","sender":"201600394353311744","internal":false,"threadID":"806366067978010635"},{"clientID":null,"content":"xd","edits":[],"files":[],"isDeleted":false,"modmailID":"806366278553698324","sender":"201600394353311744","internal":true,"threadID":"806366067978010635"},{"clientID":null,"content":"kek","edits":[],"files":[],"isDeleted":false,"modmailID":"806366899549503489","sender":"201600394353311744","internal":true,"threadID":"806366067978010635"},{"clientID":null,"content":"?","edits":[],"files":[],"isDeleted":false,"modmailID":"806367145167814727","sender":"164837347156951040","internal":true,"threadID":"806366067978010635"},{"clientID":null,"content":"plenty of errors with the forward command","edits":[],"files":[],"isDeleted":false,"modmailID":"806367246854782977","sender":"201600394353311744","internal":true,"threadID":"806366067978010635"},{"clientID":null,"content":"dam 10 seconds in to testing and there's already bugs","edits":[],"files":[],"isDeleted":false,"modmailID":"806367333135679539","sender":"164837347156951040","internal":true,"threadID":"806366067978010635"},{"clientID":null,"content":"im gonna finish my lasagna and then deal with it","edits":[],"files":[],"isDeleted":false,"modmailID":"806367374676066376","sender":"164837347156951040","internal":true,"threadID":"806366067978010635"},{"clientID":null,"content":"the issue probably lies in categories not being removed properly. Since the old dev server got fully deleted, the channels no longer exist","edits":[],"files":[],"isDeleted":false,"modmailID":"806368554516873236","sender":"201600394353311744","internal":true,"threadID":"806366067978010635"},{"clientID":null,"content":"ok good only the person who ran the command can use the reactions","edits":[],"files":[],"isDeleted":false,"modmailID":"806370068933640202","sender":"201600394353311744","internal":true,"threadID":"806366067978010635"},{"clientID":"806370959917056031","content":"t","edits":[],"files":[],"isDeleted":false,"modmailID":"806370960856580096","sender":"201600394353311744","internal":false,"threadID":"806366067978010635"},{"clientID":"806412853128462386","content":"asdf","edits":[],"files":[],"isDeleted":false,"modmailID":"806412852638253066","sender":"201600394353311744","internal":false,"threadID":"806366067978010635"}],"category":"806363218724388871"}]`
);

// TODO Rename to ModmailState since this isn't actually navigation state at all anymore
function navigationState(defaultProps: any): State {
    const { t } = useTranslation();
    const { getMember } = MembersState.useContainer();
    const [categories, setCategories] = useState<Optional<Category[]>>(undefined);
    const [threads, setThreads] = useState<Optional<MutatedThread[]>>(undefined);

    useEffect(() => {
        console.log({ defaultProps });
    });

    function findCategoryById(id: string): Nullable<Category> {
        if (categories instanceof Array) {
            return categories.find((cat) => cat.id === id) || null;
        }
        return null;
    }

    // TODO remove TEMP Function
    function fetchCategories2(): Promise<Category[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('fetchCategories');
                setCategories(TEST_CATEGORIES);
                resolve(TEST_CATEGORIES);
            }, 2000);
        });
    }

    function fetchCategories(): Promise<Category[]> {
        console.log('Fetch Categories Now!');
        return axios
            .get(t('urls.categories'))
            .then((response: AxiosResponse<FG.Api.CategoriesResponse>) => {
                console.log(response);
                if (response.status === 200) {
                    setCategories(response.data);
                    return response.data;
                }
                setCategories([]);
                return [];
            })
            .catch((err) => {
                console.error(err);
                setCategories([]);
                return [];
            });
    }

    // TODO remove TEMP Function
    function fetchOneCategory2(category: string): Promise<Nullable<Category>> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(TEST_CATEGORIES.find((cat) => cat.id === category) || null);
            }, 2000);
        });
    }

    function fetchOneCategory(category: string): Promise<Nullable<Category>> {
        return axios
            .get(t('urls.categoryOne', { category }))
            .then((response: AxiosResponse<FG.Api.CategoryOneResponse>) => {
                console.log(response);
                if (response.status === 200) {
                    return response.data;
                }
                return null;
            })
            .catch((err) => {
                console.error(err);
                return null;
            });
    }

    // TODO remove TEMP Function
    function fetchThreads2(category: string): Promise<MutatedThread[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const x = TEST_THREADS.map((thread) => {
                    return {
                        ...thread,
                        author: {
                            id: thread.author.id,
                            data: () => getMember(thread.category, thread.author.id),
                        },
                        messages: thread.messages.map((message) => ({
                            ...message,
                            sender: {
                                id: message.sender,
                                data: () => getMember(thread.category, message.sender),
                            },
                        })),
                    } as MutatedThread;
                }) as MutatedThread[];
                console.log(x);
                setThreads(x);
                resolve(x);
            }, 2000);
        });
    }

    function fetchThreads(category: string): Promise<MutatedThread[]> {
        console.log('Fetch Threads Now!');
        return axios
            .get(t('urls.threads', { category }))
            .then((response: AxiosResponse<FG.Api.ThreadsResponse>) => {
                console.log(response);
                if (response.status === 200) {
                    const mutated = response.data.map((thread) => {
                        return {
                            ...thread,
                            author: {
                                id: thread.author.id,
                                data: getMember(thread.category, thread.author.id),
                            },
                            messages: thread.messages.map((message) => ({
                                ...message,
                                sender: {
                                    id: message.sender,
                                    data: getMember(thread.category, message.sender),
                                },
                            })),
                        } as MutatedThread;
                    }) as MutatedThread[];

                    setThreads(mutated);
                    return mutated;
                }
                setThreads([]);
                return [];
            })
            .catch((err) => {
                console.error(err);
                setThreads([]);
                return [];
            });
    }

    // TODO remove TEMP Function
    function fetchOneThread(
        category: string,
        thread: string
    ): Promise<Nullable<MutatedThread>> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newThread: Thread = TEST_THREADS.find((th) => th.id === thread);
                if (newThread) {
                    resolve({
                        ...newThread,
                        author: {
                            id: newThread.author.id,
                            data: getMember(category, newThread.author.id),
                        },
                        messages: newThread.messages.map((message) => ({
                            ...message,
                            sender: {
                                id: message.sender,
                                data: getMember(category, message.sender),
                            },
                        })),
                    });
                } else {
                    resolve(null);
                }
            }, 2000);
        });
    }

    function fetchOneThread2(
        category: string,
        thread: string
    ): Promise<Nullable<MutatedThread>> {
        return axios
            .get(t('urls.threadsOne', { category, thread }))
            .then((response: AxiosResponse<FG.Api.ThreadsOneResponse>) => {
                console.log(response);
                if (response.status === 200) {
                    return {
                        ...response.data,
                        author: {
                            id: response.data.author.id,
                            data: getMember(category, response.data.author.id),
                        },
                        messages: response.data.messages.map((message) => ({
                            ...message,
                            sender: {
                                id: message.sender,
                                data: getMember(category, message.sender),
                            },
                        })),
                    };
                }
                return null;
            })
            .catch((err) => {
                console.error(err);
                return null;
            });
    }

    function findThreadById(categoryId: string, threadId: string) {
        if (threads instanceof Array) {
            return (
                threads.find(
                    (thread) => thread.category === categoryId && thread.id === threadId
                ) || null
            );
        }
        return null;
    }

    return {
        threads: {
            items: threads,
            fetch: fetchThreads,
            fetchOne: fetchOneThread,
            findById: findThreadById,
        },
        categories: {
            items: categories,
            fetch: fetchCategories,
            fetchOne: fetchOneCategory,
            findById: findCategoryById,
        },
    };
}

export function useNavigationState() {
    return createContainer(navigationState);
}

export default useNavigationState();
