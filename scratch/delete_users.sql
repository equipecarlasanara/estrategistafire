-- SQL script to revoke access (delete users and all references)
PRAGMA foreign_keys = ON;

-- User: Adriana Marques Quintano (adrioriginalle@hotmail.com) - Exact email match with 'adrioriginalle@hotmail.com'
DELETE FROM goals WHERE user_id = 'a4b81636-3d02-4600-b00f-3c024c9b59c7';
DELETE FROM weekly_actions WHERE user_id = 'a4b81636-3d02-4600-b00f-3c024c9b59c7';
DELETE FROM leads WHERE user_id = 'a4b81636-3d02-4600-b00f-3c024c9b59c7';
DELETE FROM content_items WHERE user_id = 'a4b81636-3d02-4600-b00f-3c024c9b59c7';
DELETE FROM chat_history WHERE user_id = 'a4b81636-3d02-4600-b00f-3c024c9b59c7';
DELETE FROM action_plans WHERE user_id = 'a4b81636-3d02-4600-b00f-3c024c9b59c7';
DELETE FROM usage_tracking WHERE user_id = 'a4b81636-3d02-4600-b00f-3c024c9b59c7';
DELETE FROM image_history WHERE user_id = 'a4b81636-3d02-4600-b00f-3c024c9b59c7';
DELETE FROM objection_history WHERE user_id = 'a4b81636-3d02-4600-b00f-3c024c9b59c7';
DELETE FROM users WHERE id = 'a4b81636-3d02-4600-b00f-3c024c9b59c7';

-- User: Alessandra Ribeiro Lopes Moreira Rech (alerechdesigner@icloud.com) - Exact email match with 'alerechdesigner@icloud.com'
DELETE FROM goals WHERE user_id = 'bdbdfc90-5443-4b55-bb24-73a0fde3434e';
DELETE FROM weekly_actions WHERE user_id = 'bdbdfc90-5443-4b55-bb24-73a0fde3434e';
DELETE FROM leads WHERE user_id = 'bdbdfc90-5443-4b55-bb24-73a0fde3434e';
DELETE FROM content_items WHERE user_id = 'bdbdfc90-5443-4b55-bb24-73a0fde3434e';
DELETE FROM chat_history WHERE user_id = 'bdbdfc90-5443-4b55-bb24-73a0fde3434e';
DELETE FROM action_plans WHERE user_id = 'bdbdfc90-5443-4b55-bb24-73a0fde3434e';
DELETE FROM usage_tracking WHERE user_id = 'bdbdfc90-5443-4b55-bb24-73a0fde3434e';
DELETE FROM image_history WHERE user_id = 'bdbdfc90-5443-4b55-bb24-73a0fde3434e';
DELETE FROM objection_history WHERE user_id = 'bdbdfc90-5443-4b55-bb24-73a0fde3434e';
DELETE FROM users WHERE id = 'bdbdfc90-5443-4b55-bb24-73a0fde3434e';

-- User: Amanda Bordin Leoa2026* (Uselionessstore@gmail.com) - Confirmed name match 'Amanda Bordin'
DELETE FROM goals WHERE user_id = '39efefc7-3f54-4717-a7d2-7166e7ad6781';
DELETE FROM weekly_actions WHERE user_id = '39efefc7-3f54-4717-a7d2-7166e7ad6781';
DELETE FROM leads WHERE user_id = '39efefc7-3f54-4717-a7d2-7166e7ad6781';
DELETE FROM content_items WHERE user_id = '39efefc7-3f54-4717-a7d2-7166e7ad6781';
DELETE FROM chat_history WHERE user_id = '39efefc7-3f54-4717-a7d2-7166e7ad6781';
DELETE FROM action_plans WHERE user_id = '39efefc7-3f54-4717-a7d2-7166e7ad6781';
DELETE FROM usage_tracking WHERE user_id = '39efefc7-3f54-4717-a7d2-7166e7ad6781';
DELETE FROM image_history WHERE user_id = '39efefc7-3f54-4717-a7d2-7166e7ad6781';
DELETE FROM objection_history WHERE user_id = '39efefc7-3f54-4717-a7d2-7166e7ad6781';
DELETE FROM users WHERE id = '39efefc7-3f54-4717-a7d2-7166e7ad6781';

-- User: Amanda Oliveira Scherer (amandascherer.comex@gmail.com) - Exact email match with 'amandascherer.comex@gmail.com'
DELETE FROM goals WHERE user_id = 'fbacb424-fe0d-4a06-b19c-7fcfde6c8454';
DELETE FROM weekly_actions WHERE user_id = 'fbacb424-fe0d-4a06-b19c-7fcfde6c8454';
DELETE FROM leads WHERE user_id = 'fbacb424-fe0d-4a06-b19c-7fcfde6c8454';
DELETE FROM content_items WHERE user_id = 'fbacb424-fe0d-4a06-b19c-7fcfde6c8454';
DELETE FROM chat_history WHERE user_id = 'fbacb424-fe0d-4a06-b19c-7fcfde6c8454';
DELETE FROM action_plans WHERE user_id = 'fbacb424-fe0d-4a06-b19c-7fcfde6c8454';
DELETE FROM usage_tracking WHERE user_id = 'fbacb424-fe0d-4a06-b19c-7fcfde6c8454';
DELETE FROM image_history WHERE user_id = 'fbacb424-fe0d-4a06-b19c-7fcfde6c8454';
DELETE FROM objection_history WHERE user_id = 'fbacb424-fe0d-4a06-b19c-7fcfde6c8454';
DELETE FROM users WHERE id = 'fbacb424-fe0d-4a06-b19c-7fcfde6c8454';

-- User: Amanda Tayne dias de almeida (amandadias.psicopp@gmail.com) - Exact email match with 'amandadias.psicopp@gmail.com'
DELETE FROM goals WHERE user_id = '28223681-451c-464e-999f-6fa094b4fb62';
DELETE FROM weekly_actions WHERE user_id = '28223681-451c-464e-999f-6fa094b4fb62';
DELETE FROM leads WHERE user_id = '28223681-451c-464e-999f-6fa094b4fb62';
DELETE FROM content_items WHERE user_id = '28223681-451c-464e-999f-6fa094b4fb62';
DELETE FROM chat_history WHERE user_id = '28223681-451c-464e-999f-6fa094b4fb62';
DELETE FROM action_plans WHERE user_id = '28223681-451c-464e-999f-6fa094b4fb62';
DELETE FROM usage_tracking WHERE user_id = '28223681-451c-464e-999f-6fa094b4fb62';
DELETE FROM image_history WHERE user_id = '28223681-451c-464e-999f-6fa094b4fb62';
DELETE FROM objection_history WHERE user_id = '28223681-451c-464e-999f-6fa094b4fb62';
DELETE FROM users WHERE id = '28223681-451c-464e-999f-6fa094b4fb62';

-- User: Ana Flávia Pereira Miranda (flaviapereiramv@gmail.com) - Exact email match with 'flaviapereiramv@gmail.com'
DELETE FROM goals WHERE user_id = 'b5047562-687a-4898-9400-d4c317e454b2';
DELETE FROM weekly_actions WHERE user_id = 'b5047562-687a-4898-9400-d4c317e454b2';
DELETE FROM leads WHERE user_id = 'b5047562-687a-4898-9400-d4c317e454b2';
DELETE FROM content_items WHERE user_id = 'b5047562-687a-4898-9400-d4c317e454b2';
DELETE FROM chat_history WHERE user_id = 'b5047562-687a-4898-9400-d4c317e454b2';
DELETE FROM action_plans WHERE user_id = 'b5047562-687a-4898-9400-d4c317e454b2';
DELETE FROM usage_tracking WHERE user_id = 'b5047562-687a-4898-9400-d4c317e454b2';
DELETE FROM image_history WHERE user_id = 'b5047562-687a-4898-9400-d4c317e454b2';
DELETE FROM objection_history WHERE user_id = 'b5047562-687a-4898-9400-d4c317e454b2';
DELETE FROM users WHERE id = 'b5047562-687a-4898-9400-d4c317e454b2';

-- User: Ana Paula Bortolon dos Santos Galbarino (anabortolon@hotmail.com) - Exact email match with 'anabortolon@hotmail.com'
DELETE FROM goals WHERE user_id = '587238b2-7e59-4b41-a712-4481bb596e20';
DELETE FROM weekly_actions WHERE user_id = '587238b2-7e59-4b41-a712-4481bb596e20';
DELETE FROM leads WHERE user_id = '587238b2-7e59-4b41-a712-4481bb596e20';
DELETE FROM content_items WHERE user_id = '587238b2-7e59-4b41-a712-4481bb596e20';
DELETE FROM chat_history WHERE user_id = '587238b2-7e59-4b41-a712-4481bb596e20';
DELETE FROM action_plans WHERE user_id = '587238b2-7e59-4b41-a712-4481bb596e20';
DELETE FROM usage_tracking WHERE user_id = '587238b2-7e59-4b41-a712-4481bb596e20';
DELETE FROM image_history WHERE user_id = '587238b2-7e59-4b41-a712-4481bb596e20';
DELETE FROM objection_history WHERE user_id = '587238b2-7e59-4b41-a712-4481bb596e20';
DELETE FROM users WHERE id = '587238b2-7e59-4b41-a712-4481bb596e20';

-- User: Ana vitoria morschbacher scalço (anamorschbachers@gmail.com) - Exact email match with 'anamorschbachers@gmail.com'
DELETE FROM goals WHERE user_id = 'c6cb34f2-20e9-4153-9631-1bb1302f5484';
DELETE FROM weekly_actions WHERE user_id = 'c6cb34f2-20e9-4153-9631-1bb1302f5484';
DELETE FROM leads WHERE user_id = 'c6cb34f2-20e9-4153-9631-1bb1302f5484';
DELETE FROM content_items WHERE user_id = 'c6cb34f2-20e9-4153-9631-1bb1302f5484';
DELETE FROM chat_history WHERE user_id = 'c6cb34f2-20e9-4153-9631-1bb1302f5484';
DELETE FROM action_plans WHERE user_id = 'c6cb34f2-20e9-4153-9631-1bb1302f5484';
DELETE FROM usage_tracking WHERE user_id = 'c6cb34f2-20e9-4153-9631-1bb1302f5484';
DELETE FROM image_history WHERE user_id = 'c6cb34f2-20e9-4153-9631-1bb1302f5484';
DELETE FROM objection_history WHERE user_id = 'c6cb34f2-20e9-4153-9631-1bb1302f5484';
DELETE FROM users WHERE id = 'c6cb34f2-20e9-4153-9631-1bb1302f5484';

-- User: Ananda Rodrigues (anandamirailh@gmail.com) - Exact email match with 'anandamirailh@gmail.com'
DELETE FROM goals WHERE user_id = 'f363d5d4-3ccd-4645-8546-6285bedce1f4';
DELETE FROM weekly_actions WHERE user_id = 'f363d5d4-3ccd-4645-8546-6285bedce1f4';
DELETE FROM leads WHERE user_id = 'f363d5d4-3ccd-4645-8546-6285bedce1f4';
DELETE FROM content_items WHERE user_id = 'f363d5d4-3ccd-4645-8546-6285bedce1f4';
DELETE FROM chat_history WHERE user_id = 'f363d5d4-3ccd-4645-8546-6285bedce1f4';
DELETE FROM action_plans WHERE user_id = 'f363d5d4-3ccd-4645-8546-6285bedce1f4';
DELETE FROM usage_tracking WHERE user_id = 'f363d5d4-3ccd-4645-8546-6285bedce1f4';
DELETE FROM image_history WHERE user_id = 'f363d5d4-3ccd-4645-8546-6285bedce1f4';
DELETE FROM objection_history WHERE user_id = 'f363d5d4-3ccd-4645-8546-6285bedce1f4';
DELETE FROM users WHERE id = 'f363d5d4-3ccd-4645-8546-6285bedce1f4';

-- User: Andressa Freitas da Silva (andressaedener@gmail.com) - Exact email match with 'andressaedener@gmail.com'
DELETE FROM goals WHERE user_id = '5de2b995-1adc-465d-8dd0-820ab983b621';
DELETE FROM weekly_actions WHERE user_id = '5de2b995-1adc-465d-8dd0-820ab983b621';
DELETE FROM leads WHERE user_id = '5de2b995-1adc-465d-8dd0-820ab983b621';
DELETE FROM content_items WHERE user_id = '5de2b995-1adc-465d-8dd0-820ab983b621';
DELETE FROM chat_history WHERE user_id = '5de2b995-1adc-465d-8dd0-820ab983b621';
DELETE FROM action_plans WHERE user_id = '5de2b995-1adc-465d-8dd0-820ab983b621';
DELETE FROM usage_tracking WHERE user_id = '5de2b995-1adc-465d-8dd0-820ab983b621';
DELETE FROM image_history WHERE user_id = '5de2b995-1adc-465d-8dd0-820ab983b621';
DELETE FROM objection_history WHERE user_id = '5de2b995-1adc-465d-8dd0-820ab983b621';
DELETE FROM users WHERE id = '5de2b995-1adc-465d-8dd0-820ab983b621';

-- User: Andressa Hennemann de Macedo (andressa.mhenne@gmail.com) - Exact email match with 'andressa.mhenne@gmail.com'
DELETE FROM goals WHERE user_id = '4ab52191-f37d-4d70-afc5-434c31919f2c';
DELETE FROM weekly_actions WHERE user_id = '4ab52191-f37d-4d70-afc5-434c31919f2c';
DELETE FROM leads WHERE user_id = '4ab52191-f37d-4d70-afc5-434c31919f2c';
DELETE FROM content_items WHERE user_id = '4ab52191-f37d-4d70-afc5-434c31919f2c';
DELETE FROM chat_history WHERE user_id = '4ab52191-f37d-4d70-afc5-434c31919f2c';
DELETE FROM action_plans WHERE user_id = '4ab52191-f37d-4d70-afc5-434c31919f2c';
DELETE FROM usage_tracking WHERE user_id = '4ab52191-f37d-4d70-afc5-434c31919f2c';
DELETE FROM image_history WHERE user_id = '4ab52191-f37d-4d70-afc5-434c31919f2c';
DELETE FROM objection_history WHERE user_id = '4ab52191-f37d-4d70-afc5-434c31919f2c';
DELETE FROM users WHERE id = '4ab52191-f37d-4d70-afc5-434c31919f2c';

-- User: Andressa Valéria Rigotti Prestes (lotus.mk@hotmail.com) - Exact email match with 'lotus.mk@hotmail.com'
DELETE FROM goals WHERE user_id = 'bce3638e-334f-4275-9bf5-5f89829b4d07';
DELETE FROM weekly_actions WHERE user_id = 'bce3638e-334f-4275-9bf5-5f89829b4d07';
DELETE FROM leads WHERE user_id = 'bce3638e-334f-4275-9bf5-5f89829b4d07';
DELETE FROM content_items WHERE user_id = 'bce3638e-334f-4275-9bf5-5f89829b4d07';
DELETE FROM chat_history WHERE user_id = 'bce3638e-334f-4275-9bf5-5f89829b4d07';
DELETE FROM action_plans WHERE user_id = 'bce3638e-334f-4275-9bf5-5f89829b4d07';
DELETE FROM usage_tracking WHERE user_id = 'bce3638e-334f-4275-9bf5-5f89829b4d07';
DELETE FROM image_history WHERE user_id = 'bce3638e-334f-4275-9bf5-5f89829b4d07';
DELETE FROM objection_history WHERE user_id = 'bce3638e-334f-4275-9bf5-5f89829b4d07';
DELETE FROM users WHERE id = 'bce3638e-334f-4275-9bf5-5f89829b4d07';

-- User: Andreza Madeira trindade (andrezamadeiratrindade@gmail.com) - Exact email match with 'andrezamadeiratrindade@gmail.com'
DELETE FROM goals WHERE user_id = '7d0ee01e-efdd-40ba-8ba5-10b7f2dd3cf5';
DELETE FROM weekly_actions WHERE user_id = '7d0ee01e-efdd-40ba-8ba5-10b7f2dd3cf5';
DELETE FROM leads WHERE user_id = '7d0ee01e-efdd-40ba-8ba5-10b7f2dd3cf5';
DELETE FROM content_items WHERE user_id = '7d0ee01e-efdd-40ba-8ba5-10b7f2dd3cf5';
DELETE FROM chat_history WHERE user_id = '7d0ee01e-efdd-40ba-8ba5-10b7f2dd3cf5';
DELETE FROM action_plans WHERE user_id = '7d0ee01e-efdd-40ba-8ba5-10b7f2dd3cf5';
DELETE FROM usage_tracking WHERE user_id = '7d0ee01e-efdd-40ba-8ba5-10b7f2dd3cf5';
DELETE FROM image_history WHERE user_id = '7d0ee01e-efdd-40ba-8ba5-10b7f2dd3cf5';
DELETE FROM objection_history WHERE user_id = '7d0ee01e-efdd-40ba-8ba5-10b7f2dd3cf5';
DELETE FROM users WHERE id = '7d0ee01e-efdd-40ba-8ba5-10b7f2dd3cf5';

-- User: Angelita dos santos farias (angel.raquel13@gmail.com) - Exact email match with 'angel.raquel13@gmail.com'
DELETE FROM goals WHERE user_id = '8ae2ae4e-ccf0-44f9-b20e-0f9815305bbd';
DELETE FROM weekly_actions WHERE user_id = '8ae2ae4e-ccf0-44f9-b20e-0f9815305bbd';
DELETE FROM leads WHERE user_id = '8ae2ae4e-ccf0-44f9-b20e-0f9815305bbd';
DELETE FROM content_items WHERE user_id = '8ae2ae4e-ccf0-44f9-b20e-0f9815305bbd';
DELETE FROM chat_history WHERE user_id = '8ae2ae4e-ccf0-44f9-b20e-0f9815305bbd';
DELETE FROM action_plans WHERE user_id = '8ae2ae4e-ccf0-44f9-b20e-0f9815305bbd';
DELETE FROM usage_tracking WHERE user_id = '8ae2ae4e-ccf0-44f9-b20e-0f9815305bbd';
DELETE FROM image_history WHERE user_id = '8ae2ae4e-ccf0-44f9-b20e-0f9815305bbd';
DELETE FROM objection_history WHERE user_id = '8ae2ae4e-ccf0-44f9-b20e-0f9815305bbd';
DELETE FROM users WHERE id = '8ae2ae4e-ccf0-44f9-b20e-0f9815305bbd';

-- User: Ariely lamb Cardoso (ariely.lamb@hotmail.com) - Exact email match with 'ariely.lamb@hotmail.com'
DELETE FROM goals WHERE user_id = '9d465f84-741f-41ea-84d2-307d395a539c';
DELETE FROM weekly_actions WHERE user_id = '9d465f84-741f-41ea-84d2-307d395a539c';
DELETE FROM leads WHERE user_id = '9d465f84-741f-41ea-84d2-307d395a539c';
DELETE FROM content_items WHERE user_id = '9d465f84-741f-41ea-84d2-307d395a539c';
DELETE FROM chat_history WHERE user_id = '9d465f84-741f-41ea-84d2-307d395a539c';
DELETE FROM action_plans WHERE user_id = '9d465f84-741f-41ea-84d2-307d395a539c';
DELETE FROM usage_tracking WHERE user_id = '9d465f84-741f-41ea-84d2-307d395a539c';
DELETE FROM image_history WHERE user_id = '9d465f84-741f-41ea-84d2-307d395a539c';
DELETE FROM objection_history WHERE user_id = '9d465f84-741f-41ea-84d2-307d395a539c';
DELETE FROM users WHERE id = '9d465f84-741f-41ea-84d2-307d395a539c';

-- User: Beatriz audi camara (biaaudicamara@gmail.com) - Exact email match with 'biaaudicamara@gmail.com'
DELETE FROM goals WHERE user_id = 'de5fa0fd-75cf-4bfc-b39c-5e08f7f45d48';
DELETE FROM weekly_actions WHERE user_id = 'de5fa0fd-75cf-4bfc-b39c-5e08f7f45d48';
DELETE FROM leads WHERE user_id = 'de5fa0fd-75cf-4bfc-b39c-5e08f7f45d48';
DELETE FROM content_items WHERE user_id = 'de5fa0fd-75cf-4bfc-b39c-5e08f7f45d48';
DELETE FROM chat_history WHERE user_id = 'de5fa0fd-75cf-4bfc-b39c-5e08f7f45d48';
DELETE FROM action_plans WHERE user_id = 'de5fa0fd-75cf-4bfc-b39c-5e08f7f45d48';
DELETE FROM usage_tracking WHERE user_id = 'de5fa0fd-75cf-4bfc-b39c-5e08f7f45d48';
DELETE FROM image_history WHERE user_id = 'de5fa0fd-75cf-4bfc-b39c-5e08f7f45d48';
DELETE FROM objection_history WHERE user_id = 'de5fa0fd-75cf-4bfc-b39c-5e08f7f45d48';
DELETE FROM users WHERE id = 'de5fa0fd-75cf-4bfc-b39c-5e08f7f45d48';

-- User: Bruna Daniela Saraiva freitas (Brunadaniela.sf@gmail.com) - Exact email match with 'Brunadaniela.sf@gmail.com'
DELETE FROM goals WHERE user_id = '67c39a9e-775c-4242-9b56-af66b79ac19b';
DELETE FROM weekly_actions WHERE user_id = '67c39a9e-775c-4242-9b56-af66b79ac19b';
DELETE FROM leads WHERE user_id = '67c39a9e-775c-4242-9b56-af66b79ac19b';
DELETE FROM content_items WHERE user_id = '67c39a9e-775c-4242-9b56-af66b79ac19b';
DELETE FROM chat_history WHERE user_id = '67c39a9e-775c-4242-9b56-af66b79ac19b';
DELETE FROM action_plans WHERE user_id = '67c39a9e-775c-4242-9b56-af66b79ac19b';
DELETE FROM usage_tracking WHERE user_id = '67c39a9e-775c-4242-9b56-af66b79ac19b';
DELETE FROM image_history WHERE user_id = '67c39a9e-775c-4242-9b56-af66b79ac19b';
DELETE FROM objection_history WHERE user_id = '67c39a9e-775c-4242-9b56-af66b79ac19b';
DELETE FROM users WHERE id = '67c39a9e-775c-4242-9b56-af66b79ac19b';

-- User: Carina Regina Flores Paiva Neves (carinaflores5@yahoo.com.br) - Exact email match with 'carinaflores5@yahoo.com.br'
DELETE FROM goals WHERE user_id = '98c5ed3b-201f-45b1-b7d4-af45cf83b17d';
DELETE FROM weekly_actions WHERE user_id = '98c5ed3b-201f-45b1-b7d4-af45cf83b17d';
DELETE FROM leads WHERE user_id = '98c5ed3b-201f-45b1-b7d4-af45cf83b17d';
DELETE FROM content_items WHERE user_id = '98c5ed3b-201f-45b1-b7d4-af45cf83b17d';
DELETE FROM chat_history WHERE user_id = '98c5ed3b-201f-45b1-b7d4-af45cf83b17d';
DELETE FROM action_plans WHERE user_id = '98c5ed3b-201f-45b1-b7d4-af45cf83b17d';
DELETE FROM usage_tracking WHERE user_id = '98c5ed3b-201f-45b1-b7d4-af45cf83b17d';
DELETE FROM image_history WHERE user_id = '98c5ed3b-201f-45b1-b7d4-af45cf83b17d';
DELETE FROM objection_history WHERE user_id = '98c5ed3b-201f-45b1-b7d4-af45cf83b17d';
DELETE FROM users WHERE id = '98c5ed3b-201f-45b1-b7d4-af45cf83b17d';

-- User: Carla Roberta Carvalho (carlarobertamoveis@gmail.com) - Confirmed name match 'Carla Roberta Carvalho'
DELETE FROM goals WHERE user_id = '3969f139-40a3-4128-8e96-082629acba19';
DELETE FROM weekly_actions WHERE user_id = '3969f139-40a3-4128-8e96-082629acba19';
DELETE FROM leads WHERE user_id = '3969f139-40a3-4128-8e96-082629acba19';
DELETE FROM content_items WHERE user_id = '3969f139-40a3-4128-8e96-082629acba19';
DELETE FROM chat_history WHERE user_id = '3969f139-40a3-4128-8e96-082629acba19';
DELETE FROM action_plans WHERE user_id = '3969f139-40a3-4128-8e96-082629acba19';
DELETE FROM usage_tracking WHERE user_id = '3969f139-40a3-4128-8e96-082629acba19';
DELETE FROM image_history WHERE user_id = '3969f139-40a3-4128-8e96-082629acba19';
DELETE FROM objection_history WHERE user_id = '3969f139-40a3-4128-8e96-082629acba19';
DELETE FROM users WHERE id = '3969f139-40a3-4128-8e96-082629acba19';

-- User: Carla Sanara (maepragmatica@gmail.com) - Exact email match with 'maepragmatica@gmail.com'
DELETE FROM goals WHERE user_id = '5415f02c-7eb9-482f-b1f1-46151123efdc';
DELETE FROM weekly_actions WHERE user_id = '5415f02c-7eb9-482f-b1f1-46151123efdc';
DELETE FROM leads WHERE user_id = '5415f02c-7eb9-482f-b1f1-46151123efdc';
DELETE FROM content_items WHERE user_id = '5415f02c-7eb9-482f-b1f1-46151123efdc';
DELETE FROM chat_history WHERE user_id = '5415f02c-7eb9-482f-b1f1-46151123efdc';
DELETE FROM action_plans WHERE user_id = '5415f02c-7eb9-482f-b1f1-46151123efdc';
DELETE FROM usage_tracking WHERE user_id = '5415f02c-7eb9-482f-b1f1-46151123efdc';
DELETE FROM image_history WHERE user_id = '5415f02c-7eb9-482f-b1f1-46151123efdc';
DELETE FROM objection_history WHERE user_id = '5415f02c-7eb9-482f-b1f1-46151123efdc';
DELETE FROM users WHERE id = '5415f02c-7eb9-482f-b1f1-46151123efdc';

-- User: Cilene Augusta da silva (cilene.augusta@icloud.com) - Exact email match with 'cilene.augusta@icloud.com'
DELETE FROM goals WHERE user_id = '96935fdb-2b5b-4c42-984e-18a6bf092c48';
DELETE FROM weekly_actions WHERE user_id = '96935fdb-2b5b-4c42-984e-18a6bf092c48';
DELETE FROM leads WHERE user_id = '96935fdb-2b5b-4c42-984e-18a6bf092c48';
DELETE FROM content_items WHERE user_id = '96935fdb-2b5b-4c42-984e-18a6bf092c48';
DELETE FROM chat_history WHERE user_id = '96935fdb-2b5b-4c42-984e-18a6bf092c48';
DELETE FROM action_plans WHERE user_id = '96935fdb-2b5b-4c42-984e-18a6bf092c48';
DELETE FROM usage_tracking WHERE user_id = '96935fdb-2b5b-4c42-984e-18a6bf092c48';
DELETE FROM image_history WHERE user_id = '96935fdb-2b5b-4c42-984e-18a6bf092c48';
DELETE FROM objection_history WHERE user_id = '96935fdb-2b5b-4c42-984e-18a6bf092c48';
DELETE FROM users WHERE id = '96935fdb-2b5b-4c42-984e-18a6bf092c48';

-- User: Daiana Sueli mafra couto (dra_daiana@outlook.com) - Exact email match with 'dra_daiana@outlook.com'
DELETE FROM goals WHERE user_id = '6c6e3af4-a9b5-463b-898a-470a3dd664ed';
DELETE FROM weekly_actions WHERE user_id = '6c6e3af4-a9b5-463b-898a-470a3dd664ed';
DELETE FROM leads WHERE user_id = '6c6e3af4-a9b5-463b-898a-470a3dd664ed';
DELETE FROM content_items WHERE user_id = '6c6e3af4-a9b5-463b-898a-470a3dd664ed';
DELETE FROM chat_history WHERE user_id = '6c6e3af4-a9b5-463b-898a-470a3dd664ed';
DELETE FROM action_plans WHERE user_id = '6c6e3af4-a9b5-463b-898a-470a3dd664ed';
DELETE FROM usage_tracking WHERE user_id = '6c6e3af4-a9b5-463b-898a-470a3dd664ed';
DELETE FROM image_history WHERE user_id = '6c6e3af4-a9b5-463b-898a-470a3dd664ed';
DELETE FROM objection_history WHERE user_id = '6c6e3af4-a9b5-463b-898a-470a3dd664ed';
DELETE FROM users WHERE id = '6c6e3af4-a9b5-463b-898a-470a3dd664ed';

-- User: Daiane Fernanda Mattei Magalhães (daianemagic.1g@gmail.com) - Exact email match with 'daianemagic.1g@gmail.com'
DELETE FROM goals WHERE user_id = '6cd483bf-9253-4273-ad86-e5e8112e9b91';
DELETE FROM weekly_actions WHERE user_id = '6cd483bf-9253-4273-ad86-e5e8112e9b91';
DELETE FROM leads WHERE user_id = '6cd483bf-9253-4273-ad86-e5e8112e9b91';
DELETE FROM content_items WHERE user_id = '6cd483bf-9253-4273-ad86-e5e8112e9b91';
DELETE FROM chat_history WHERE user_id = '6cd483bf-9253-4273-ad86-e5e8112e9b91';
DELETE FROM action_plans WHERE user_id = '6cd483bf-9253-4273-ad86-e5e8112e9b91';
DELETE FROM usage_tracking WHERE user_id = '6cd483bf-9253-4273-ad86-e5e8112e9b91';
DELETE FROM image_history WHERE user_id = '6cd483bf-9253-4273-ad86-e5e8112e9b91';
DELETE FROM objection_history WHERE user_id = '6cd483bf-9253-4273-ad86-e5e8112e9b91';
DELETE FROM users WHERE id = '6cd483bf-9253-4273-ad86-e5e8112e9b91';

-- User: Daniele da Conceição Vicente (danielevicente.09@outlook.com) - Exact email match with 'danielevicente.09@outlook.com'
DELETE FROM goals WHERE user_id = 'fb4e4ec1-25ee-4d9f-9821-9ff86d3f7fd3';
DELETE FROM weekly_actions WHERE user_id = 'fb4e4ec1-25ee-4d9f-9821-9ff86d3f7fd3';
DELETE FROM leads WHERE user_id = 'fb4e4ec1-25ee-4d9f-9821-9ff86d3f7fd3';
DELETE FROM content_items WHERE user_id = 'fb4e4ec1-25ee-4d9f-9821-9ff86d3f7fd3';
DELETE FROM chat_history WHERE user_id = 'fb4e4ec1-25ee-4d9f-9821-9ff86d3f7fd3';
DELETE FROM action_plans WHERE user_id = 'fb4e4ec1-25ee-4d9f-9821-9ff86d3f7fd3';
DELETE FROM usage_tracking WHERE user_id = 'fb4e4ec1-25ee-4d9f-9821-9ff86d3f7fd3';
DELETE FROM image_history WHERE user_id = 'fb4e4ec1-25ee-4d9f-9821-9ff86d3f7fd3';
DELETE FROM objection_history WHERE user_id = 'fb4e4ec1-25ee-4d9f-9821-9ff86d3f7fd3';
DELETE FROM users WHERE id = 'fb4e4ec1-25ee-4d9f-9821-9ff86d3f7fd3';

-- User: Degliane Bernardes (deglianebernardes00@gmail.com) - Exact email match with 'deglianebernardes00@gmail.com'
DELETE FROM goals WHERE user_id = '9f677434-41ca-4447-89dc-5e513bfac6a8';
DELETE FROM weekly_actions WHERE user_id = '9f677434-41ca-4447-89dc-5e513bfac6a8';
DELETE FROM leads WHERE user_id = '9f677434-41ca-4447-89dc-5e513bfac6a8';
DELETE FROM content_items WHERE user_id = '9f677434-41ca-4447-89dc-5e513bfac6a8';
DELETE FROM chat_history WHERE user_id = '9f677434-41ca-4447-89dc-5e513bfac6a8';
DELETE FROM action_plans WHERE user_id = '9f677434-41ca-4447-89dc-5e513bfac6a8';
DELETE FROM usage_tracking WHERE user_id = '9f677434-41ca-4447-89dc-5e513bfac6a8';
DELETE FROM image_history WHERE user_id = '9f677434-41ca-4447-89dc-5e513bfac6a8';
DELETE FROM objection_history WHERE user_id = '9f677434-41ca-4447-89dc-5e513bfac6a8';
DELETE FROM users WHERE id = '9f677434-41ca-4447-89dc-5e513bfac6a8';

-- User: Deise de melo moraes (moraes.melo.deise@gmail.com) - Exact email match with 'moraes.melo.deise@gmail.com'
DELETE FROM goals WHERE user_id = '93a427d9-8da2-4803-bb89-5ab92952d629';
DELETE FROM weekly_actions WHERE user_id = '93a427d9-8da2-4803-bb89-5ab92952d629';
DELETE FROM leads WHERE user_id = '93a427d9-8da2-4803-bb89-5ab92952d629';
DELETE FROM content_items WHERE user_id = '93a427d9-8da2-4803-bb89-5ab92952d629';
DELETE FROM chat_history WHERE user_id = '93a427d9-8da2-4803-bb89-5ab92952d629';
DELETE FROM action_plans WHERE user_id = '93a427d9-8da2-4803-bb89-5ab92952d629';
DELETE FROM usage_tracking WHERE user_id = '93a427d9-8da2-4803-bb89-5ab92952d629';
DELETE FROM image_history WHERE user_id = '93a427d9-8da2-4803-bb89-5ab92952d629';
DELETE FROM objection_history WHERE user_id = '93a427d9-8da2-4803-bb89-5ab92952d629';
DELETE FROM users WHERE id = '93a427d9-8da2-4803-bb89-5ab92952d629';

-- User: Deise Ramos Py Ramos (deise_wd@hotmail.com) - Exact email match with 'deise_wd@hotmail.com'
DELETE FROM goals WHERE user_id = '6c5eb0e5-1607-4703-8106-e754cbfd722d';
DELETE FROM weekly_actions WHERE user_id = '6c5eb0e5-1607-4703-8106-e754cbfd722d';
DELETE FROM leads WHERE user_id = '6c5eb0e5-1607-4703-8106-e754cbfd722d';
DELETE FROM content_items WHERE user_id = '6c5eb0e5-1607-4703-8106-e754cbfd722d';
DELETE FROM chat_history WHERE user_id = '6c5eb0e5-1607-4703-8106-e754cbfd722d';
DELETE FROM action_plans WHERE user_id = '6c5eb0e5-1607-4703-8106-e754cbfd722d';
DELETE FROM usage_tracking WHERE user_id = '6c5eb0e5-1607-4703-8106-e754cbfd722d';
DELETE FROM image_history WHERE user_id = '6c5eb0e5-1607-4703-8106-e754cbfd722d';
DELETE FROM objection_history WHERE user_id = '6c5eb0e5-1607-4703-8106-e754cbfd722d';
DELETE FROM users WHERE id = '6c5eb0e5-1607-4703-8106-e754cbfd722d';

-- User: Deise tamara dutra (deisetdutra@gmail.com) - Exact email match with 'deisetdutra@gmail.com'
DELETE FROM goals WHERE user_id = 'aa031c2d-e9c0-45ce-b04f-4ae26ecd9686';
DELETE FROM weekly_actions WHERE user_id = 'aa031c2d-e9c0-45ce-b04f-4ae26ecd9686';
DELETE FROM leads WHERE user_id = 'aa031c2d-e9c0-45ce-b04f-4ae26ecd9686';
DELETE FROM content_items WHERE user_id = 'aa031c2d-e9c0-45ce-b04f-4ae26ecd9686';
DELETE FROM chat_history WHERE user_id = 'aa031c2d-e9c0-45ce-b04f-4ae26ecd9686';
DELETE FROM action_plans WHERE user_id = 'aa031c2d-e9c0-45ce-b04f-4ae26ecd9686';
DELETE FROM usage_tracking WHERE user_id = 'aa031c2d-e9c0-45ce-b04f-4ae26ecd9686';
DELETE FROM image_history WHERE user_id = 'aa031c2d-e9c0-45ce-b04f-4ae26ecd9686';
DELETE FROM objection_history WHERE user_id = 'aa031c2d-e9c0-45ce-b04f-4ae26ecd9686';
DELETE FROM users WHERE id = 'aa031c2d-e9c0-45ce-b04f-4ae26ecd9686';

-- User: Débora Cristina Assafrão Rodrigues (assafraodebora@gmail.com) - Exact email match with 'assafraodebora@gmail.com'
DELETE FROM goals WHERE user_id = 'cb7972cf-ab24-4999-bb75-64ac54271d5f';
DELETE FROM weekly_actions WHERE user_id = 'cb7972cf-ab24-4999-bb75-64ac54271d5f';
DELETE FROM leads WHERE user_id = 'cb7972cf-ab24-4999-bb75-64ac54271d5f';
DELETE FROM content_items WHERE user_id = 'cb7972cf-ab24-4999-bb75-64ac54271d5f';
DELETE FROM chat_history WHERE user_id = 'cb7972cf-ab24-4999-bb75-64ac54271d5f';
DELETE FROM action_plans WHERE user_id = 'cb7972cf-ab24-4999-bb75-64ac54271d5f';
DELETE FROM usage_tracking WHERE user_id = 'cb7972cf-ab24-4999-bb75-64ac54271d5f';
DELETE FROM image_history WHERE user_id = 'cb7972cf-ab24-4999-bb75-64ac54271d5f';
DELETE FROM objection_history WHERE user_id = 'cb7972cf-ab24-4999-bb75-64ac54271d5f';
DELETE FROM users WHERE id = 'cb7972cf-ab24-4999-bb75-64ac54271d5f';

-- User: Débora da Silva Peres (deborasipe@gmail.com) - Exact email match with 'deborasipe@gmail.com'
DELETE FROM goals WHERE user_id = '442215f8-f5b2-4871-af0b-a1a671a87843';
DELETE FROM weekly_actions WHERE user_id = '442215f8-f5b2-4871-af0b-a1a671a87843';
DELETE FROM leads WHERE user_id = '442215f8-f5b2-4871-af0b-a1a671a87843';
DELETE FROM content_items WHERE user_id = '442215f8-f5b2-4871-af0b-a1a671a87843';
DELETE FROM chat_history WHERE user_id = '442215f8-f5b2-4871-af0b-a1a671a87843';
DELETE FROM action_plans WHERE user_id = '442215f8-f5b2-4871-af0b-a1a671a87843';
DELETE FROM usage_tracking WHERE user_id = '442215f8-f5b2-4871-af0b-a1a671a87843';
DELETE FROM image_history WHERE user_id = '442215f8-f5b2-4871-af0b-a1a671a87843';
DELETE FROM objection_history WHERE user_id = '442215f8-f5b2-4871-af0b-a1a671a87843';
DELETE FROM users WHERE id = '442215f8-f5b2-4871-af0b-a1a671a87843';

-- User: Edineia Fablice Vicente (neiafabri@hotmail.com) - Exact email match with 'neiafabri@hotmail.com'
DELETE FROM goals WHERE user_id = 'a4003cb6-96ba-49b3-9ca6-af8905c6d1ad';
DELETE FROM weekly_actions WHERE user_id = 'a4003cb6-96ba-49b3-9ca6-af8905c6d1ad';
DELETE FROM leads WHERE user_id = 'a4003cb6-96ba-49b3-9ca6-af8905c6d1ad';
DELETE FROM content_items WHERE user_id = 'a4003cb6-96ba-49b3-9ca6-af8905c6d1ad';
DELETE FROM chat_history WHERE user_id = 'a4003cb6-96ba-49b3-9ca6-af8905c6d1ad';
DELETE FROM action_plans WHERE user_id = 'a4003cb6-96ba-49b3-9ca6-af8905c6d1ad';
DELETE FROM usage_tracking WHERE user_id = 'a4003cb6-96ba-49b3-9ca6-af8905c6d1ad';
DELETE FROM image_history WHERE user_id = 'a4003cb6-96ba-49b3-9ca6-af8905c6d1ad';
DELETE FROM objection_history WHERE user_id = 'a4003cb6-96ba-49b3-9ca6-af8905c6d1ad';
DELETE FROM users WHERE id = 'a4003cb6-96ba-49b3-9ca6-af8905c6d1ad';

-- User: Eduarda Alves Chagas (dudda.dsgn@gmail.com) - Exact email match with 'dudda.dsgn@gmail.com'
DELETE FROM goals WHERE user_id = '4da7d7ca-6c7b-438f-8b4f-b2d7415d6e7e';
DELETE FROM weekly_actions WHERE user_id = '4da7d7ca-6c7b-438f-8b4f-b2d7415d6e7e';
DELETE FROM leads WHERE user_id = '4da7d7ca-6c7b-438f-8b4f-b2d7415d6e7e';
DELETE FROM content_items WHERE user_id = '4da7d7ca-6c7b-438f-8b4f-b2d7415d6e7e';
DELETE FROM chat_history WHERE user_id = '4da7d7ca-6c7b-438f-8b4f-b2d7415d6e7e';
DELETE FROM action_plans WHERE user_id = '4da7d7ca-6c7b-438f-8b4f-b2d7415d6e7e';
DELETE FROM usage_tracking WHERE user_id = '4da7d7ca-6c7b-438f-8b4f-b2d7415d6e7e';
DELETE FROM image_history WHERE user_id = '4da7d7ca-6c7b-438f-8b4f-b2d7415d6e7e';
DELETE FROM objection_history WHERE user_id = '4da7d7ca-6c7b-438f-8b4f-b2d7415d6e7e';
DELETE FROM users WHERE id = '4da7d7ca-6c7b-438f-8b4f-b2d7415d6e7e';

-- User: Eduardo leonir mendes da Silva  (biancabmuller@gmail.com) - Exact email match with 'biancabmuller@gmail.com'
DELETE FROM goals WHERE user_id = 'f60e2a54-15f5-4039-ba97-c37df11bf70f';
DELETE FROM weekly_actions WHERE user_id = 'f60e2a54-15f5-4039-ba97-c37df11bf70f';
DELETE FROM leads WHERE user_id = 'f60e2a54-15f5-4039-ba97-c37df11bf70f';
DELETE FROM content_items WHERE user_id = 'f60e2a54-15f5-4039-ba97-c37df11bf70f';
DELETE FROM chat_history WHERE user_id = 'f60e2a54-15f5-4039-ba97-c37df11bf70f';
DELETE FROM action_plans WHERE user_id = 'f60e2a54-15f5-4039-ba97-c37df11bf70f';
DELETE FROM usage_tracking WHERE user_id = 'f60e2a54-15f5-4039-ba97-c37df11bf70f';
DELETE FROM image_history WHERE user_id = 'f60e2a54-15f5-4039-ba97-c37df11bf70f';
DELETE FROM objection_history WHERE user_id = 'f60e2a54-15f5-4039-ba97-c37df11bf70f';
DELETE FROM users WHERE id = 'f60e2a54-15f5-4039-ba97-c37df11bf70f';

-- User: Eliana Iohann de Siqueira (eliana.iohann@icloud.com) - Exact email match with 'eliana.iohann@icloud.com'
DELETE FROM goals WHERE user_id = 'cad4c571-997a-4e21-a650-471f214f7ddb';
DELETE FROM weekly_actions WHERE user_id = 'cad4c571-997a-4e21-a650-471f214f7ddb';
DELETE FROM leads WHERE user_id = 'cad4c571-997a-4e21-a650-471f214f7ddb';
DELETE FROM content_items WHERE user_id = 'cad4c571-997a-4e21-a650-471f214f7ddb';
DELETE FROM chat_history WHERE user_id = 'cad4c571-997a-4e21-a650-471f214f7ddb';
DELETE FROM action_plans WHERE user_id = 'cad4c571-997a-4e21-a650-471f214f7ddb';
DELETE FROM usage_tracking WHERE user_id = 'cad4c571-997a-4e21-a650-471f214f7ddb';
DELETE FROM image_history WHERE user_id = 'cad4c571-997a-4e21-a650-471f214f7ddb';
DELETE FROM objection_history WHERE user_id = 'cad4c571-997a-4e21-a650-471f214f7ddb';
DELETE FROM users WHERE id = 'cad4c571-997a-4e21-a650-471f214f7ddb';

-- User: Fernanda Silveira Pessel (pessel.fs@gmail.com) - Exact email match with 'pessel.fs@gmail.com'
DELETE FROM goals WHERE user_id = '27894710-44f9-486d-879c-3c62a675e0fa';
DELETE FROM weekly_actions WHERE user_id = '27894710-44f9-486d-879c-3c62a675e0fa';
DELETE FROM leads WHERE user_id = '27894710-44f9-486d-879c-3c62a675e0fa';
DELETE FROM content_items WHERE user_id = '27894710-44f9-486d-879c-3c62a675e0fa';
DELETE FROM chat_history WHERE user_id = '27894710-44f9-486d-879c-3c62a675e0fa';
DELETE FROM action_plans WHERE user_id = '27894710-44f9-486d-879c-3c62a675e0fa';
DELETE FROM usage_tracking WHERE user_id = '27894710-44f9-486d-879c-3c62a675e0fa';
DELETE FROM image_history WHERE user_id = '27894710-44f9-486d-879c-3c62a675e0fa';
DELETE FROM objection_history WHERE user_id = '27894710-44f9-486d-879c-3c62a675e0fa';
DELETE FROM users WHERE id = '27894710-44f9-486d-879c-3c62a675e0fa';

-- User: Flavia batista de souza (flaviasouzaunip@gmail.com) - Exact email match with 'flaviasouzaunip@gmail.com'
DELETE FROM goals WHERE user_id = '1d2f9a2e-510e-4b8d-9997-b79d25521d6b';
DELETE FROM weekly_actions WHERE user_id = '1d2f9a2e-510e-4b8d-9997-b79d25521d6b';
DELETE FROM leads WHERE user_id = '1d2f9a2e-510e-4b8d-9997-b79d25521d6b';
DELETE FROM content_items WHERE user_id = '1d2f9a2e-510e-4b8d-9997-b79d25521d6b';
DELETE FROM chat_history WHERE user_id = '1d2f9a2e-510e-4b8d-9997-b79d25521d6b';
DELETE FROM action_plans WHERE user_id = '1d2f9a2e-510e-4b8d-9997-b79d25521d6b';
DELETE FROM usage_tracking WHERE user_id = '1d2f9a2e-510e-4b8d-9997-b79d25521d6b';
DELETE FROM image_history WHERE user_id = '1d2f9a2e-510e-4b8d-9997-b79d25521d6b';
DELETE FROM objection_history WHERE user_id = '1d2f9a2e-510e-4b8d-9997-b79d25521d6b';
DELETE FROM users WHERE id = '1d2f9a2e-510e-4b8d-9997-b79d25521d6b';

-- User: Gabriela Fonseca  (gabfonseca132@gmail.com) - Exact email match with 'gabfonseca132@gmail.com'
DELETE FROM goals WHERE user_id = '862bb124-af08-4e56-8792-ea74d4eb49bb';
DELETE FROM weekly_actions WHERE user_id = '862bb124-af08-4e56-8792-ea74d4eb49bb';
DELETE FROM leads WHERE user_id = '862bb124-af08-4e56-8792-ea74d4eb49bb';
DELETE FROM content_items WHERE user_id = '862bb124-af08-4e56-8792-ea74d4eb49bb';
DELETE FROM chat_history WHERE user_id = '862bb124-af08-4e56-8792-ea74d4eb49bb';
DELETE FROM action_plans WHERE user_id = '862bb124-af08-4e56-8792-ea74d4eb49bb';
DELETE FROM usage_tracking WHERE user_id = '862bb124-af08-4e56-8792-ea74d4eb49bb';
DELETE FROM image_history WHERE user_id = '862bb124-af08-4e56-8792-ea74d4eb49bb';
DELETE FROM objection_history WHERE user_id = '862bb124-af08-4e56-8792-ea74d4eb49bb';
DELETE FROM users WHERE id = '862bb124-af08-4e56-8792-ea74d4eb49bb';

-- User: Gabrielle Pereira dos santos (gabriellepereirasantos5@gmail.com) - Exact email match with 'gabriellepereirasantos5@gmail.com'
DELETE FROM goals WHERE user_id = '5fae88a9-8988-4890-81c5-e61709f1e2a7';
DELETE FROM weekly_actions WHERE user_id = '5fae88a9-8988-4890-81c5-e61709f1e2a7';
DELETE FROM leads WHERE user_id = '5fae88a9-8988-4890-81c5-e61709f1e2a7';
DELETE FROM content_items WHERE user_id = '5fae88a9-8988-4890-81c5-e61709f1e2a7';
DELETE FROM chat_history WHERE user_id = '5fae88a9-8988-4890-81c5-e61709f1e2a7';
DELETE FROM action_plans WHERE user_id = '5fae88a9-8988-4890-81c5-e61709f1e2a7';
DELETE FROM usage_tracking WHERE user_id = '5fae88a9-8988-4890-81c5-e61709f1e2a7';
DELETE FROM image_history WHERE user_id = '5fae88a9-8988-4890-81c5-e61709f1e2a7';
DELETE FROM objection_history WHERE user_id = '5fae88a9-8988-4890-81c5-e61709f1e2a7';
DELETE FROM users WHERE id = '5fae88a9-8988-4890-81c5-e61709f1e2a7';

-- User: Giordana Rizzon de Sousa de Oliveira (gio.rizzon@gmail.com) - Exact email match with 'gio.rizzon@gmail.com'
DELETE FROM goals WHERE user_id = '2c4242a3-f242-40df-9a4b-c84ef970a54d';
DELETE FROM weekly_actions WHERE user_id = '2c4242a3-f242-40df-9a4b-c84ef970a54d';
DELETE FROM leads WHERE user_id = '2c4242a3-f242-40df-9a4b-c84ef970a54d';
DELETE FROM content_items WHERE user_id = '2c4242a3-f242-40df-9a4b-c84ef970a54d';
DELETE FROM chat_history WHERE user_id = '2c4242a3-f242-40df-9a4b-c84ef970a54d';
DELETE FROM action_plans WHERE user_id = '2c4242a3-f242-40df-9a4b-c84ef970a54d';
DELETE FROM usage_tracking WHERE user_id = '2c4242a3-f242-40df-9a4b-c84ef970a54d';
DELETE FROM image_history WHERE user_id = '2c4242a3-f242-40df-9a4b-c84ef970a54d';
DELETE FROM objection_history WHERE user_id = '2c4242a3-f242-40df-9a4b-c84ef970a54d';
DELETE FROM users WHERE id = '2c4242a3-f242-40df-9a4b-c84ef970a54d';

-- User: ISABEL CRISTINA SARAIVA FREITAS  (isabelcsfreitas@gmail.com) - Exact email match with 'isabelcsfreitas@gmail.com'
DELETE FROM goals WHERE user_id = '90055def-dc74-47d2-9972-422f9ce1544e';
DELETE FROM weekly_actions WHERE user_id = '90055def-dc74-47d2-9972-422f9ce1544e';
DELETE FROM leads WHERE user_id = '90055def-dc74-47d2-9972-422f9ce1544e';
DELETE FROM content_items WHERE user_id = '90055def-dc74-47d2-9972-422f9ce1544e';
DELETE FROM chat_history WHERE user_id = '90055def-dc74-47d2-9972-422f9ce1544e';
DELETE FROM action_plans WHERE user_id = '90055def-dc74-47d2-9972-422f9ce1544e';
DELETE FROM usage_tracking WHERE user_id = '90055def-dc74-47d2-9972-422f9ce1544e';
DELETE FROM image_history WHERE user_id = '90055def-dc74-47d2-9972-422f9ce1544e';
DELETE FROM objection_history WHERE user_id = '90055def-dc74-47d2-9972-422f9ce1544e';
DELETE FROM users WHERE id = '90055def-dc74-47d2-9972-422f9ce1544e';

-- User: Isabelle Justo (isabelle.justo@eaportal.org) - Exact email match with 'isabelle.justo@eaportal.org'
DELETE FROM goals WHERE user_id = '5b7e9099-fc17-4cec-9039-a7653ca9b4e9';
DELETE FROM weekly_actions WHERE user_id = '5b7e9099-fc17-4cec-9039-a7653ca9b4e9';
DELETE FROM leads WHERE user_id = '5b7e9099-fc17-4cec-9039-a7653ca9b4e9';
DELETE FROM content_items WHERE user_id = '5b7e9099-fc17-4cec-9039-a7653ca9b4e9';
DELETE FROM chat_history WHERE user_id = '5b7e9099-fc17-4cec-9039-a7653ca9b4e9';
DELETE FROM action_plans WHERE user_id = '5b7e9099-fc17-4cec-9039-a7653ca9b4e9';
DELETE FROM usage_tracking WHERE user_id = '5b7e9099-fc17-4cec-9039-a7653ca9b4e9';
DELETE FROM image_history WHERE user_id = '5b7e9099-fc17-4cec-9039-a7653ca9b4e9';
DELETE FROM objection_history WHERE user_id = '5b7e9099-fc17-4cec-9039-a7653ca9b4e9';
DELETE FROM users WHERE id = '5b7e9099-fc17-4cec-9039-a7653ca9b4e9';

-- User: Jane Marcelle Nascimento Pinheiro (jmnpinheiro34@gmail.com) - Exact email match with 'jmnpinheiro34@gmail.com'
DELETE FROM goals WHERE user_id = 'a5d6db38-b3cd-4779-83f2-550c78b9f766';
DELETE FROM weekly_actions WHERE user_id = 'a5d6db38-b3cd-4779-83f2-550c78b9f766';
DELETE FROM leads WHERE user_id = 'a5d6db38-b3cd-4779-83f2-550c78b9f766';
DELETE FROM content_items WHERE user_id = 'a5d6db38-b3cd-4779-83f2-550c78b9f766';
DELETE FROM chat_history WHERE user_id = 'a5d6db38-b3cd-4779-83f2-550c78b9f766';
DELETE FROM action_plans WHERE user_id = 'a5d6db38-b3cd-4779-83f2-550c78b9f766';
DELETE FROM usage_tracking WHERE user_id = 'a5d6db38-b3cd-4779-83f2-550c78b9f766';
DELETE FROM image_history WHERE user_id = 'a5d6db38-b3cd-4779-83f2-550c78b9f766';
DELETE FROM objection_history WHERE user_id = 'a5d6db38-b3cd-4779-83f2-550c78b9f766';
DELETE FROM users WHERE id = 'a5d6db38-b3cd-4779-83f2-550c78b9f766';

-- User: Joice Dutra (joicedutra0@gmail.com) - Exact email match with 'joicedutra0@gmail.com'
DELETE FROM goals WHERE user_id = '388f741b-ccd1-4fdc-a81c-f478cbd7cefc';
DELETE FROM weekly_actions WHERE user_id = '388f741b-ccd1-4fdc-a81c-f478cbd7cefc';
DELETE FROM leads WHERE user_id = '388f741b-ccd1-4fdc-a81c-f478cbd7cefc';
DELETE FROM content_items WHERE user_id = '388f741b-ccd1-4fdc-a81c-f478cbd7cefc';
DELETE FROM chat_history WHERE user_id = '388f741b-ccd1-4fdc-a81c-f478cbd7cefc';
DELETE FROM action_plans WHERE user_id = '388f741b-ccd1-4fdc-a81c-f478cbd7cefc';
DELETE FROM usage_tracking WHERE user_id = '388f741b-ccd1-4fdc-a81c-f478cbd7cefc';
DELETE FROM image_history WHERE user_id = '388f741b-ccd1-4fdc-a81c-f478cbd7cefc';
DELETE FROM objection_history WHERE user_id = '388f741b-ccd1-4fdc-a81c-f478cbd7cefc';
DELETE FROM users WHERE id = '388f741b-ccd1-4fdc-a81c-f478cbd7cefc';

-- User: Josiane Maria Silva (josy.maria.silva@hotmail.com) - Exact email match with 'josy.maria.silva@hotmail.com'
DELETE FROM goals WHERE user_id = '7dc5f363-5b25-41ac-b23f-e6301bb68652';
DELETE FROM weekly_actions WHERE user_id = '7dc5f363-5b25-41ac-b23f-e6301bb68652';
DELETE FROM leads WHERE user_id = '7dc5f363-5b25-41ac-b23f-e6301bb68652';
DELETE FROM content_items WHERE user_id = '7dc5f363-5b25-41ac-b23f-e6301bb68652';
DELETE FROM chat_history WHERE user_id = '7dc5f363-5b25-41ac-b23f-e6301bb68652';
DELETE FROM action_plans WHERE user_id = '7dc5f363-5b25-41ac-b23f-e6301bb68652';
DELETE FROM usage_tracking WHERE user_id = '7dc5f363-5b25-41ac-b23f-e6301bb68652';
DELETE FROM image_history WHERE user_id = '7dc5f363-5b25-41ac-b23f-e6301bb68652';
DELETE FROM objection_history WHERE user_id = '7dc5f363-5b25-41ac-b23f-e6301bb68652';
DELETE FROM users WHERE id = '7dc5f363-5b25-41ac-b23f-e6301bb68652';

-- User: Jucieli Lacardelli (juci@agelsci.com.br) - Exact email match with 'juci@agelsci.com.br'
DELETE FROM goals WHERE user_id = '24cf550c-1dc9-4fa3-ba8c-831ffdd05b24';
DELETE FROM weekly_actions WHERE user_id = '24cf550c-1dc9-4fa3-ba8c-831ffdd05b24';
DELETE FROM leads WHERE user_id = '24cf550c-1dc9-4fa3-ba8c-831ffdd05b24';
DELETE FROM content_items WHERE user_id = '24cf550c-1dc9-4fa3-ba8c-831ffdd05b24';
DELETE FROM chat_history WHERE user_id = '24cf550c-1dc9-4fa3-ba8c-831ffdd05b24';
DELETE FROM action_plans WHERE user_id = '24cf550c-1dc9-4fa3-ba8c-831ffdd05b24';
DELETE FROM usage_tracking WHERE user_id = '24cf550c-1dc9-4fa3-ba8c-831ffdd05b24';
DELETE FROM image_history WHERE user_id = '24cf550c-1dc9-4fa3-ba8c-831ffdd05b24';
DELETE FROM objection_history WHERE user_id = '24cf550c-1dc9-4fa3-ba8c-831ffdd05b24';
DELETE FROM users WHERE id = '24cf550c-1dc9-4fa3-ba8c-831ffdd05b24';

-- User: Juliana lopes almeida (Jhully-ana@oulook.com) - Exact email match with 'Jhully-ana@oulook.com'
DELETE FROM goals WHERE user_id = 'f0ed4aac-450b-4a8c-9757-ab5f66389796';
DELETE FROM weekly_actions WHERE user_id = 'f0ed4aac-450b-4a8c-9757-ab5f66389796';
DELETE FROM leads WHERE user_id = 'f0ed4aac-450b-4a8c-9757-ab5f66389796';
DELETE FROM content_items WHERE user_id = 'f0ed4aac-450b-4a8c-9757-ab5f66389796';
DELETE FROM chat_history WHERE user_id = 'f0ed4aac-450b-4a8c-9757-ab5f66389796';
DELETE FROM action_plans WHERE user_id = 'f0ed4aac-450b-4a8c-9757-ab5f66389796';
DELETE FROM usage_tracking WHERE user_id = 'f0ed4aac-450b-4a8c-9757-ab5f66389796';
DELETE FROM image_history WHERE user_id = 'f0ed4aac-450b-4a8c-9757-ab5f66389796';
DELETE FROM objection_history WHERE user_id = 'f0ed4aac-450b-4a8c-9757-ab5f66389796';
DELETE FROM users WHERE id = 'f0ed4aac-450b-4a8c-9757-ab5f66389796';

-- User: Juliane Nascimento (julianeinascimento@gmail.com) - Exact email match with 'julianeinascimento@gmail.com'
DELETE FROM goals WHERE user_id = '28f9138c-f842-4b75-b135-f401eab80736';
DELETE FROM weekly_actions WHERE user_id = '28f9138c-f842-4b75-b135-f401eab80736';
DELETE FROM leads WHERE user_id = '28f9138c-f842-4b75-b135-f401eab80736';
DELETE FROM content_items WHERE user_id = '28f9138c-f842-4b75-b135-f401eab80736';
DELETE FROM chat_history WHERE user_id = '28f9138c-f842-4b75-b135-f401eab80736';
DELETE FROM action_plans WHERE user_id = '28f9138c-f842-4b75-b135-f401eab80736';
DELETE FROM usage_tracking WHERE user_id = '28f9138c-f842-4b75-b135-f401eab80736';
DELETE FROM image_history WHERE user_id = '28f9138c-f842-4b75-b135-f401eab80736';
DELETE FROM objection_history WHERE user_id = '28f9138c-f842-4b75-b135-f401eab80736';
DELETE FROM users WHERE id = '28f9138c-f842-4b75-b135-f401eab80736';

-- User: Junior Cabreira (jucabreira7@gmail.com) - Exact email match with 'jucabreira7@gmail.com'
DELETE FROM goals WHERE user_id = 'fe60bd2b-9551-4ce7-92d0-3d539774a62d';
DELETE FROM weekly_actions WHERE user_id = 'fe60bd2b-9551-4ce7-92d0-3d539774a62d';
DELETE FROM leads WHERE user_id = 'fe60bd2b-9551-4ce7-92d0-3d539774a62d';
DELETE FROM content_items WHERE user_id = 'fe60bd2b-9551-4ce7-92d0-3d539774a62d';
DELETE FROM chat_history WHERE user_id = 'fe60bd2b-9551-4ce7-92d0-3d539774a62d';
DELETE FROM action_plans WHERE user_id = 'fe60bd2b-9551-4ce7-92d0-3d539774a62d';
DELETE FROM usage_tracking WHERE user_id = 'fe60bd2b-9551-4ce7-92d0-3d539774a62d';
DELETE FROM image_history WHERE user_id = 'fe60bd2b-9551-4ce7-92d0-3d539774a62d';
DELETE FROM objection_history WHERE user_id = 'fe60bd2b-9551-4ce7-92d0-3d539774a62d';
DELETE FROM users WHERE id = 'fe60bd2b-9551-4ce7-92d0-3d539774a62d';

-- User: Jéssica Cantini (fisio.jecantini@gmail.com) - Exact email match with 'fisio.jecantini@gmail.com'
DELETE FROM goals WHERE user_id = 'b5dedfb2-716b-42ab-8a0b-83860029a762';
DELETE FROM weekly_actions WHERE user_id = 'b5dedfb2-716b-42ab-8a0b-83860029a762';
DELETE FROM leads WHERE user_id = 'b5dedfb2-716b-42ab-8a0b-83860029a762';
DELETE FROM content_items WHERE user_id = 'b5dedfb2-716b-42ab-8a0b-83860029a762';
DELETE FROM chat_history WHERE user_id = 'b5dedfb2-716b-42ab-8a0b-83860029a762';
DELETE FROM action_plans WHERE user_id = 'b5dedfb2-716b-42ab-8a0b-83860029a762';
DELETE FROM usage_tracking WHERE user_id = 'b5dedfb2-716b-42ab-8a0b-83860029a762';
DELETE FROM image_history WHERE user_id = 'b5dedfb2-716b-42ab-8a0b-83860029a762';
DELETE FROM objection_history WHERE user_id = 'b5dedfb2-716b-42ab-8a0b-83860029a762';
DELETE FROM users WHERE id = 'b5dedfb2-716b-42ab-8a0b-83860029a762';

-- User: Jêniffer cristina Freitas Costa (jenienadia@hotmail.com) - Exact email match with 'jenienadia@hotmail.com'
DELETE FROM goals WHERE user_id = '697d7480-64d0-4099-93d3-712e71218e12';
DELETE FROM weekly_actions WHERE user_id = '697d7480-64d0-4099-93d3-712e71218e12';
DELETE FROM leads WHERE user_id = '697d7480-64d0-4099-93d3-712e71218e12';
DELETE FROM content_items WHERE user_id = '697d7480-64d0-4099-93d3-712e71218e12';
DELETE FROM chat_history WHERE user_id = '697d7480-64d0-4099-93d3-712e71218e12';
DELETE FROM action_plans WHERE user_id = '697d7480-64d0-4099-93d3-712e71218e12';
DELETE FROM usage_tracking WHERE user_id = '697d7480-64d0-4099-93d3-712e71218e12';
DELETE FROM image_history WHERE user_id = '697d7480-64d0-4099-93d3-712e71218e12';
DELETE FROM objection_history WHERE user_id = '697d7480-64d0-4099-93d3-712e71218e12';
DELETE FROM users WHERE id = '697d7480-64d0-4099-93d3-712e71218e12';

-- User: Larissa Tonheca (larissatonheca@hotmail.com) - Exact email match with 'larissatonheca@hotmail.com'
DELETE FROM goals WHERE user_id = '13561fe5-ec22-442e-a8dd-b3b981c4162e';
DELETE FROM weekly_actions WHERE user_id = '13561fe5-ec22-442e-a8dd-b3b981c4162e';
DELETE FROM leads WHERE user_id = '13561fe5-ec22-442e-a8dd-b3b981c4162e';
DELETE FROM content_items WHERE user_id = '13561fe5-ec22-442e-a8dd-b3b981c4162e';
DELETE FROM chat_history WHERE user_id = '13561fe5-ec22-442e-a8dd-b3b981c4162e';
DELETE FROM action_plans WHERE user_id = '13561fe5-ec22-442e-a8dd-b3b981c4162e';
DELETE FROM usage_tracking WHERE user_id = '13561fe5-ec22-442e-a8dd-b3b981c4162e';
DELETE FROM image_history WHERE user_id = '13561fe5-ec22-442e-a8dd-b3b981c4162e';
DELETE FROM objection_history WHERE user_id = '13561fe5-ec22-442e-a8dd-b3b981c4162e';
DELETE FROM users WHERE id = '13561fe5-ec22-442e-a8dd-b3b981c4162e';

-- User: Laura Collar Rodrigues (lauracollaradv@gmail.com) - Exact email match with 'lauracollaradv@gmail.com'
DELETE FROM goals WHERE user_id = '75854840-1d9d-4b8a-b0c4-4b1d40cb0a48';
DELETE FROM weekly_actions WHERE user_id = '75854840-1d9d-4b8a-b0c4-4b1d40cb0a48';
DELETE FROM leads WHERE user_id = '75854840-1d9d-4b8a-b0c4-4b1d40cb0a48';
DELETE FROM content_items WHERE user_id = '75854840-1d9d-4b8a-b0c4-4b1d40cb0a48';
DELETE FROM chat_history WHERE user_id = '75854840-1d9d-4b8a-b0c4-4b1d40cb0a48';
DELETE FROM action_plans WHERE user_id = '75854840-1d9d-4b8a-b0c4-4b1d40cb0a48';
DELETE FROM usage_tracking WHERE user_id = '75854840-1d9d-4b8a-b0c4-4b1d40cb0a48';
DELETE FROM image_history WHERE user_id = '75854840-1d9d-4b8a-b0c4-4b1d40cb0a48';
DELETE FROM objection_history WHERE user_id = '75854840-1d9d-4b8a-b0c4-4b1d40cb0a48';
DELETE FROM users WHERE id = '75854840-1d9d-4b8a-b0c4-4b1d40cb0a48';

-- User: Letícia Souza Dutra (Leticiabittencourtsouza@gmail.com) - Exact email match with 'Leticiabittencourtsouza@gmail.com'
DELETE FROM goals WHERE user_id = '0b19dbb9-e731-40a6-90b2-cd774aad2155';
DELETE FROM weekly_actions WHERE user_id = '0b19dbb9-e731-40a6-90b2-cd774aad2155';
DELETE FROM leads WHERE user_id = '0b19dbb9-e731-40a6-90b2-cd774aad2155';
DELETE FROM content_items WHERE user_id = '0b19dbb9-e731-40a6-90b2-cd774aad2155';
DELETE FROM chat_history WHERE user_id = '0b19dbb9-e731-40a6-90b2-cd774aad2155';
DELETE FROM action_plans WHERE user_id = '0b19dbb9-e731-40a6-90b2-cd774aad2155';
DELETE FROM usage_tracking WHERE user_id = '0b19dbb9-e731-40a6-90b2-cd774aad2155';
DELETE FROM image_history WHERE user_id = '0b19dbb9-e731-40a6-90b2-cd774aad2155';
DELETE FROM objection_history WHERE user_id = '0b19dbb9-e731-40a6-90b2-cd774aad2155';
DELETE FROM users WHERE id = '0b19dbb9-e731-40a6-90b2-cd774aad2155';

-- User: Letícia Souza Dutra  (leticiabittencourtsouza@gmail.com) - Exact email match with 'Leticiabittencourtsouza@gmail.com'
DELETE FROM goals WHERE user_id = 'f1da896b-ee7c-423b-9ab2-2536dc67f504';
DELETE FROM weekly_actions WHERE user_id = 'f1da896b-ee7c-423b-9ab2-2536dc67f504';
DELETE FROM leads WHERE user_id = 'f1da896b-ee7c-423b-9ab2-2536dc67f504';
DELETE FROM content_items WHERE user_id = 'f1da896b-ee7c-423b-9ab2-2536dc67f504';
DELETE FROM chat_history WHERE user_id = 'f1da896b-ee7c-423b-9ab2-2536dc67f504';
DELETE FROM action_plans WHERE user_id = 'f1da896b-ee7c-423b-9ab2-2536dc67f504';
DELETE FROM usage_tracking WHERE user_id = 'f1da896b-ee7c-423b-9ab2-2536dc67f504';
DELETE FROM image_history WHERE user_id = 'f1da896b-ee7c-423b-9ab2-2536dc67f504';
DELETE FROM objection_history WHERE user_id = 'f1da896b-ee7c-423b-9ab2-2536dc67f504';
DELETE FROM users WHERE id = 'f1da896b-ee7c-423b-9ab2-2536dc67f504';

-- User: Leyla Prates (pratesleyla@gmail.com) - Exact email match with 'pratesleyla@gmail.com'
DELETE FROM goals WHERE user_id = '5a4bf1b4-8b4a-4c76-8d94-50531824224e';
DELETE FROM weekly_actions WHERE user_id = '5a4bf1b4-8b4a-4c76-8d94-50531824224e';
DELETE FROM leads WHERE user_id = '5a4bf1b4-8b4a-4c76-8d94-50531824224e';
DELETE FROM content_items WHERE user_id = '5a4bf1b4-8b4a-4c76-8d94-50531824224e';
DELETE FROM chat_history WHERE user_id = '5a4bf1b4-8b4a-4c76-8d94-50531824224e';
DELETE FROM action_plans WHERE user_id = '5a4bf1b4-8b4a-4c76-8d94-50531824224e';
DELETE FROM usage_tracking WHERE user_id = '5a4bf1b4-8b4a-4c76-8d94-50531824224e';
DELETE FROM image_history WHERE user_id = '5a4bf1b4-8b4a-4c76-8d94-50531824224e';
DELETE FROM objection_history WHERE user_id = '5a4bf1b4-8b4a-4c76-8d94-50531824224e';
DELETE FROM users WHERE id = '5a4bf1b4-8b4a-4c76-8d94-50531824224e';

-- User: Liliane Tavares Weinheimer  (lilianeweinheimer@gmail.com) - Exact email match with 'lilianeweinheimer@gmail.com'
DELETE FROM goals WHERE user_id = '03783339-7aeb-4385-af50-bdb7f423a033';
DELETE FROM weekly_actions WHERE user_id = '03783339-7aeb-4385-af50-bdb7f423a033';
DELETE FROM leads WHERE user_id = '03783339-7aeb-4385-af50-bdb7f423a033';
DELETE FROM content_items WHERE user_id = '03783339-7aeb-4385-af50-bdb7f423a033';
DELETE FROM chat_history WHERE user_id = '03783339-7aeb-4385-af50-bdb7f423a033';
DELETE FROM action_plans WHERE user_id = '03783339-7aeb-4385-af50-bdb7f423a033';
DELETE FROM usage_tracking WHERE user_id = '03783339-7aeb-4385-af50-bdb7f423a033';
DELETE FROM image_history WHERE user_id = '03783339-7aeb-4385-af50-bdb7f423a033';
DELETE FROM objection_history WHERE user_id = '03783339-7aeb-4385-af50-bdb7f423a033';
DELETE FROM users WHERE id = '03783339-7aeb-4385-af50-bdb7f423a033';

-- User: Lithiele da Silva velasques (lithy_dgv@hotmail.com) - Exact email match with 'lithy_dgv@hotmail.com'
DELETE FROM goals WHERE user_id = '5a81daa3-82a2-4d06-af5d-2ac39d772312';
DELETE FROM weekly_actions WHERE user_id = '5a81daa3-82a2-4d06-af5d-2ac39d772312';
DELETE FROM leads WHERE user_id = '5a81daa3-82a2-4d06-af5d-2ac39d772312';
DELETE FROM content_items WHERE user_id = '5a81daa3-82a2-4d06-af5d-2ac39d772312';
DELETE FROM chat_history WHERE user_id = '5a81daa3-82a2-4d06-af5d-2ac39d772312';
DELETE FROM action_plans WHERE user_id = '5a81daa3-82a2-4d06-af5d-2ac39d772312';
DELETE FROM usage_tracking WHERE user_id = '5a81daa3-82a2-4d06-af5d-2ac39d772312';
DELETE FROM image_history WHERE user_id = '5a81daa3-82a2-4d06-af5d-2ac39d772312';
DELETE FROM objection_history WHERE user_id = '5a81daa3-82a2-4d06-af5d-2ac39d772312';
DELETE FROM users WHERE id = '5a81daa3-82a2-4d06-af5d-2ac39d772312';

-- User: Luciane Carine Kirschke Meleu (luciane.carine@gmail.com) - Exact email match with 'luciane.carine@gmail.com'
DELETE FROM goals WHERE user_id = '4642b8ad-3a9a-49a7-8e36-b7eef3c64648';
DELETE FROM weekly_actions WHERE user_id = '4642b8ad-3a9a-49a7-8e36-b7eef3c64648';
DELETE FROM leads WHERE user_id = '4642b8ad-3a9a-49a7-8e36-b7eef3c64648';
DELETE FROM content_items WHERE user_id = '4642b8ad-3a9a-49a7-8e36-b7eef3c64648';
DELETE FROM chat_history WHERE user_id = '4642b8ad-3a9a-49a7-8e36-b7eef3c64648';
DELETE FROM action_plans WHERE user_id = '4642b8ad-3a9a-49a7-8e36-b7eef3c64648';
DELETE FROM usage_tracking WHERE user_id = '4642b8ad-3a9a-49a7-8e36-b7eef3c64648';
DELETE FROM image_history WHERE user_id = '4642b8ad-3a9a-49a7-8e36-b7eef3c64648';
DELETE FROM objection_history WHERE user_id = '4642b8ad-3a9a-49a7-8e36-b7eef3c64648';
DELETE FROM users WHERE id = '4642b8ad-3a9a-49a7-8e36-b7eef3c64648';

-- User: Maria Alice Kanitz (mariaalicekanitz@outlook.com) - Exact email match with 'mariaalicekanitz@outlook.com'
DELETE FROM goals WHERE user_id = '8dbeada2-3576-4cb5-b2ac-48e272cfbe4f';
DELETE FROM weekly_actions WHERE user_id = '8dbeada2-3576-4cb5-b2ac-48e272cfbe4f';
DELETE FROM leads WHERE user_id = '8dbeada2-3576-4cb5-b2ac-48e272cfbe4f';
DELETE FROM content_items WHERE user_id = '8dbeada2-3576-4cb5-b2ac-48e272cfbe4f';
DELETE FROM chat_history WHERE user_id = '8dbeada2-3576-4cb5-b2ac-48e272cfbe4f';
DELETE FROM action_plans WHERE user_id = '8dbeada2-3576-4cb5-b2ac-48e272cfbe4f';
DELETE FROM usage_tracking WHERE user_id = '8dbeada2-3576-4cb5-b2ac-48e272cfbe4f';
DELETE FROM image_history WHERE user_id = '8dbeada2-3576-4cb5-b2ac-48e272cfbe4f';
DELETE FROM objection_history WHERE user_id = '8dbeada2-3576-4cb5-b2ac-48e272cfbe4f';
DELETE FROM users WHERE id = '8dbeada2-3576-4cb5-b2ac-48e272cfbe4f';

-- User: Martilenisi M. O. moreira (mentora.martin.moreira@gmail.com) - Exact email match with 'mentora.martin.moreira@gmail.com'
DELETE FROM goals WHERE user_id = '26189360-05dc-47b4-977d-e8c6a111e967';
DELETE FROM weekly_actions WHERE user_id = '26189360-05dc-47b4-977d-e8c6a111e967';
DELETE FROM leads WHERE user_id = '26189360-05dc-47b4-977d-e8c6a111e967';
DELETE FROM content_items WHERE user_id = '26189360-05dc-47b4-977d-e8c6a111e967';
DELETE FROM chat_history WHERE user_id = '26189360-05dc-47b4-977d-e8c6a111e967';
DELETE FROM action_plans WHERE user_id = '26189360-05dc-47b4-977d-e8c6a111e967';
DELETE FROM usage_tracking WHERE user_id = '26189360-05dc-47b4-977d-e8c6a111e967';
DELETE FROM image_history WHERE user_id = '26189360-05dc-47b4-977d-e8c6a111e967';
DELETE FROM objection_history WHERE user_id = '26189360-05dc-47b4-977d-e8c6a111e967';
DELETE FROM users WHERE id = '26189360-05dc-47b4-977d-e8c6a111e967';

-- User: melyna bolze soares (bolzemelyna@gmail.com) - Exact email match with 'bolzemelyna@gmail.com'
DELETE FROM goals WHERE user_id = 'a5cef384-e07e-4b11-8374-529c37c2529e';
DELETE FROM weekly_actions WHERE user_id = 'a5cef384-e07e-4b11-8374-529c37c2529e';
DELETE FROM leads WHERE user_id = 'a5cef384-e07e-4b11-8374-529c37c2529e';
DELETE FROM content_items WHERE user_id = 'a5cef384-e07e-4b11-8374-529c37c2529e';
DELETE FROM chat_history WHERE user_id = 'a5cef384-e07e-4b11-8374-529c37c2529e';
DELETE FROM action_plans WHERE user_id = 'a5cef384-e07e-4b11-8374-529c37c2529e';
DELETE FROM usage_tracking WHERE user_id = 'a5cef384-e07e-4b11-8374-529c37c2529e';
DELETE FROM image_history WHERE user_id = 'a5cef384-e07e-4b11-8374-529c37c2529e';
DELETE FROM objection_history WHERE user_id = 'a5cef384-e07e-4b11-8374-529c37c2529e';
DELETE FROM users WHERE id = 'a5cef384-e07e-4b11-8374-529c37c2529e';

-- User: Michelli Hermes Altini (michellihermes@gmail.com) - Exact email match with 'michellihermes@gmail.com'
DELETE FROM goals WHERE user_id = 'eb574629-7e35-43d3-91fc-37c2350cd9bc';
DELETE FROM weekly_actions WHERE user_id = 'eb574629-7e35-43d3-91fc-37c2350cd9bc';
DELETE FROM leads WHERE user_id = 'eb574629-7e35-43d3-91fc-37c2350cd9bc';
DELETE FROM content_items WHERE user_id = 'eb574629-7e35-43d3-91fc-37c2350cd9bc';
DELETE FROM chat_history WHERE user_id = 'eb574629-7e35-43d3-91fc-37c2350cd9bc';
DELETE FROM action_plans WHERE user_id = 'eb574629-7e35-43d3-91fc-37c2350cd9bc';
DELETE FROM usage_tracking WHERE user_id = 'eb574629-7e35-43d3-91fc-37c2350cd9bc';
DELETE FROM image_history WHERE user_id = 'eb574629-7e35-43d3-91fc-37c2350cd9bc';
DELETE FROM objection_history WHERE user_id = 'eb574629-7e35-43d3-91fc-37c2350cd9bc';
DELETE FROM users WHERE id = 'eb574629-7e35-43d3-91fc-37c2350cd9bc';

-- User: Mirian Cricielly de Oliveira Pimentel (Polensemijoias@gmail.com) - Confirmed name match 'Mirian Cricielly de Oliveira Pimentel'
DELETE FROM goals WHERE user_id = '109f944b-2ec9-4c3a-ab57-9932d5bd7f61';
DELETE FROM weekly_actions WHERE user_id = '109f944b-2ec9-4c3a-ab57-9932d5bd7f61';
DELETE FROM leads WHERE user_id = '109f944b-2ec9-4c3a-ab57-9932d5bd7f61';
DELETE FROM content_items WHERE user_id = '109f944b-2ec9-4c3a-ab57-9932d5bd7f61';
DELETE FROM chat_history WHERE user_id = '109f944b-2ec9-4c3a-ab57-9932d5bd7f61';
DELETE FROM action_plans WHERE user_id = '109f944b-2ec9-4c3a-ab57-9932d5bd7f61';
DELETE FROM usage_tracking WHERE user_id = '109f944b-2ec9-4c3a-ab57-9932d5bd7f61';
DELETE FROM image_history WHERE user_id = '109f944b-2ec9-4c3a-ab57-9932d5bd7f61';
DELETE FROM objection_history WHERE user_id = '109f944b-2ec9-4c3a-ab57-9932d5bd7f61';
DELETE FROM users WHERE id = '109f944b-2ec9-4c3a-ab57-9932d5bd7f61';

-- User: Márcia Adriana (marcia.0602@hotmail.com) - Exact email match with 'marcia.0602@hotmail.com'
DELETE FROM goals WHERE user_id = '3c46b568-f194-46ba-b300-ef582fb64e7c';
DELETE FROM weekly_actions WHERE user_id = '3c46b568-f194-46ba-b300-ef582fb64e7c';
DELETE FROM leads WHERE user_id = '3c46b568-f194-46ba-b300-ef582fb64e7c';
DELETE FROM content_items WHERE user_id = '3c46b568-f194-46ba-b300-ef582fb64e7c';
DELETE FROM chat_history WHERE user_id = '3c46b568-f194-46ba-b300-ef582fb64e7c';
DELETE FROM action_plans WHERE user_id = '3c46b568-f194-46ba-b300-ef582fb64e7c';
DELETE FROM usage_tracking WHERE user_id = '3c46b568-f194-46ba-b300-ef582fb64e7c';
DELETE FROM image_history WHERE user_id = '3c46b568-f194-46ba-b300-ef582fb64e7c';
DELETE FROM objection_history WHERE user_id = '3c46b568-f194-46ba-b300-ef582fb64e7c';
DELETE FROM users WHERE id = '3c46b568-f194-46ba-b300-ef582fb64e7c';

-- User: Naiara Alves Darolt (naiaradarolt@yahoo.com) - Exact email match with 'naiaradarolt@yahoo.com'
DELETE FROM goals WHERE user_id = '6ed20cec-1326-4938-b991-f5683a6f05fa';
DELETE FROM weekly_actions WHERE user_id = '6ed20cec-1326-4938-b991-f5683a6f05fa';
DELETE FROM leads WHERE user_id = '6ed20cec-1326-4938-b991-f5683a6f05fa';
DELETE FROM content_items WHERE user_id = '6ed20cec-1326-4938-b991-f5683a6f05fa';
DELETE FROM chat_history WHERE user_id = '6ed20cec-1326-4938-b991-f5683a6f05fa';
DELETE FROM action_plans WHERE user_id = '6ed20cec-1326-4938-b991-f5683a6f05fa';
DELETE FROM usage_tracking WHERE user_id = '6ed20cec-1326-4938-b991-f5683a6f05fa';
DELETE FROM image_history WHERE user_id = '6ed20cec-1326-4938-b991-f5683a6f05fa';
DELETE FROM objection_history WHERE user_id = '6ed20cec-1326-4938-b991-f5683a6f05fa';
DELETE FROM users WHERE id = '6ed20cec-1326-4938-b991-f5683a6f05fa';

-- User: Natasha M rodrigues (contadora.natasha@gmail.com) - Exact email match with 'contadora.natasha@gmail.com'
DELETE FROM goals WHERE user_id = 'd4b3dd3d-0bfd-4b98-b8db-6f58772a7ea4';
DELETE FROM weekly_actions WHERE user_id = 'd4b3dd3d-0bfd-4b98-b8db-6f58772a7ea4';
DELETE FROM leads WHERE user_id = 'd4b3dd3d-0bfd-4b98-b8db-6f58772a7ea4';
DELETE FROM content_items WHERE user_id = 'd4b3dd3d-0bfd-4b98-b8db-6f58772a7ea4';
DELETE FROM chat_history WHERE user_id = 'd4b3dd3d-0bfd-4b98-b8db-6f58772a7ea4';
DELETE FROM action_plans WHERE user_id = 'd4b3dd3d-0bfd-4b98-b8db-6f58772a7ea4';
DELETE FROM usage_tracking WHERE user_id = 'd4b3dd3d-0bfd-4b98-b8db-6f58772a7ea4';
DELETE FROM image_history WHERE user_id = 'd4b3dd3d-0bfd-4b98-b8db-6f58772a7ea4';
DELETE FROM objection_history WHERE user_id = 'd4b3dd3d-0bfd-4b98-b8db-6f58772a7ea4';
DELETE FROM users WHERE id = 'd4b3dd3d-0bfd-4b98-b8db-6f58772a7ea4';

-- User: Nathalia cristina da silva pereira (nathakiaspereira91@gmail.com) - Exact email match with 'nathakiaspereira91@gmail.com'
DELETE FROM goals WHERE user_id = '50ede92e-7ed3-48a1-a31d-65abc7cfb097';
DELETE FROM weekly_actions WHERE user_id = '50ede92e-7ed3-48a1-a31d-65abc7cfb097';
DELETE FROM leads WHERE user_id = '50ede92e-7ed3-48a1-a31d-65abc7cfb097';
DELETE FROM content_items WHERE user_id = '50ede92e-7ed3-48a1-a31d-65abc7cfb097';
DELETE FROM chat_history WHERE user_id = '50ede92e-7ed3-48a1-a31d-65abc7cfb097';
DELETE FROM action_plans WHERE user_id = '50ede92e-7ed3-48a1-a31d-65abc7cfb097';
DELETE FROM usage_tracking WHERE user_id = '50ede92e-7ed3-48a1-a31d-65abc7cfb097';
DELETE FROM image_history WHERE user_id = '50ede92e-7ed3-48a1-a31d-65abc7cfb097';
DELETE FROM objection_history WHERE user_id = '50ede92e-7ed3-48a1-a31d-65abc7cfb097';
DELETE FROM users WHERE id = '50ede92e-7ed3-48a1-a31d-65abc7cfb097';

-- User: Nicole Hohgraefe (nicole.hohgtaefe@gmail.com) - Exact email match with 'nicole.hohgtaefe@gmail.com'
DELETE FROM goals WHERE user_id = 'e8e88d88-d1bd-4158-a08e-3c620939bedb';
DELETE FROM weekly_actions WHERE user_id = 'e8e88d88-d1bd-4158-a08e-3c620939bedb';
DELETE FROM leads WHERE user_id = 'e8e88d88-d1bd-4158-a08e-3c620939bedb';
DELETE FROM content_items WHERE user_id = 'e8e88d88-d1bd-4158-a08e-3c620939bedb';
DELETE FROM chat_history WHERE user_id = 'e8e88d88-d1bd-4158-a08e-3c620939bedb';
DELETE FROM action_plans WHERE user_id = 'e8e88d88-d1bd-4158-a08e-3c620939bedb';
DELETE FROM usage_tracking WHERE user_id = 'e8e88d88-d1bd-4158-a08e-3c620939bedb';
DELETE FROM image_history WHERE user_id = 'e8e88d88-d1bd-4158-a08e-3c620939bedb';
DELETE FROM objection_history WHERE user_id = 'e8e88d88-d1bd-4158-a08e-3c620939bedb';
DELETE FROM users WHERE id = 'e8e88d88-d1bd-4158-a08e-3c620939bedb';

-- User: Polianna Lazzarini (divinapolly@gmail.com) - Exact email match with 'divinapolly@gmail.com'
DELETE FROM goals WHERE user_id = '6b469e14-a462-4eb7-9479-0ea645f1a66d';
DELETE FROM weekly_actions WHERE user_id = '6b469e14-a462-4eb7-9479-0ea645f1a66d';
DELETE FROM leads WHERE user_id = '6b469e14-a462-4eb7-9479-0ea645f1a66d';
DELETE FROM content_items WHERE user_id = '6b469e14-a462-4eb7-9479-0ea645f1a66d';
DELETE FROM chat_history WHERE user_id = '6b469e14-a462-4eb7-9479-0ea645f1a66d';
DELETE FROM action_plans WHERE user_id = '6b469e14-a462-4eb7-9479-0ea645f1a66d';
DELETE FROM usage_tracking WHERE user_id = '6b469e14-a462-4eb7-9479-0ea645f1a66d';
DELETE FROM image_history WHERE user_id = '6b469e14-a462-4eb7-9479-0ea645f1a66d';
DELETE FROM objection_history WHERE user_id = '6b469e14-a462-4eb7-9479-0ea645f1a66d';
DELETE FROM users WHERE id = '6b469e14-a462-4eb7-9479-0ea645f1a66d';

-- User: Raphaella Willer (barbosarapha.98@gmail.com) - Exact email match with 'barbosarapha.98@gmail.com'
DELETE FROM goals WHERE user_id = 'aa17c73c-c574-49f8-b2f6-379ae32ac714';
DELETE FROM weekly_actions WHERE user_id = 'aa17c73c-c574-49f8-b2f6-379ae32ac714';
DELETE FROM leads WHERE user_id = 'aa17c73c-c574-49f8-b2f6-379ae32ac714';
DELETE FROM content_items WHERE user_id = 'aa17c73c-c574-49f8-b2f6-379ae32ac714';
DELETE FROM chat_history WHERE user_id = 'aa17c73c-c574-49f8-b2f6-379ae32ac714';
DELETE FROM action_plans WHERE user_id = 'aa17c73c-c574-49f8-b2f6-379ae32ac714';
DELETE FROM usage_tracking WHERE user_id = 'aa17c73c-c574-49f8-b2f6-379ae32ac714';
DELETE FROM image_history WHERE user_id = 'aa17c73c-c574-49f8-b2f6-379ae32ac714';
DELETE FROM objection_history WHERE user_id = 'aa17c73c-c574-49f8-b2f6-379ae32ac714';
DELETE FROM users WHERE id = 'aa17c73c-c574-49f8-b2f6-379ae32ac714';

-- User: Rayara Lengruber da silva tavares (lengruberheart@gmail.com) - Exact email match with 'lengruberheart@gmail.com'
DELETE FROM goals WHERE user_id = '86d3fc75-a727-4e22-8900-b903bc8e7a36';
DELETE FROM weekly_actions WHERE user_id = '86d3fc75-a727-4e22-8900-b903bc8e7a36';
DELETE FROM leads WHERE user_id = '86d3fc75-a727-4e22-8900-b903bc8e7a36';
DELETE FROM content_items WHERE user_id = '86d3fc75-a727-4e22-8900-b903bc8e7a36';
DELETE FROM chat_history WHERE user_id = '86d3fc75-a727-4e22-8900-b903bc8e7a36';
DELETE FROM action_plans WHERE user_id = '86d3fc75-a727-4e22-8900-b903bc8e7a36';
DELETE FROM usage_tracking WHERE user_id = '86d3fc75-a727-4e22-8900-b903bc8e7a36';
DELETE FROM image_history WHERE user_id = '86d3fc75-a727-4e22-8900-b903bc8e7a36';
DELETE FROM objection_history WHERE user_id = '86d3fc75-a727-4e22-8900-b903bc8e7a36';
DELETE FROM users WHERE id = '86d3fc75-a727-4e22-8900-b903bc8e7a36';

-- User: Renata Cunha Karam (renata_karam@hotmail.com) - Exact email match with 'renata_karam@hotmail.com'
DELETE FROM goals WHERE user_id = '2fae7868-9c21-4fba-b23f-5f6caac45d4e';
DELETE FROM weekly_actions WHERE user_id = '2fae7868-9c21-4fba-b23f-5f6caac45d4e';
DELETE FROM leads WHERE user_id = '2fae7868-9c21-4fba-b23f-5f6caac45d4e';
DELETE FROM content_items WHERE user_id = '2fae7868-9c21-4fba-b23f-5f6caac45d4e';
DELETE FROM chat_history WHERE user_id = '2fae7868-9c21-4fba-b23f-5f6caac45d4e';
DELETE FROM action_plans WHERE user_id = '2fae7868-9c21-4fba-b23f-5f6caac45d4e';
DELETE FROM usage_tracking WHERE user_id = '2fae7868-9c21-4fba-b23f-5f6caac45d4e';
DELETE FROM image_history WHERE user_id = '2fae7868-9c21-4fba-b23f-5f6caac45d4e';
DELETE FROM objection_history WHERE user_id = '2fae7868-9c21-4fba-b23f-5f6caac45d4e';
DELETE FROM users WHERE id = '2fae7868-9c21-4fba-b23f-5f6caac45d4e';

-- User: Richele Silva da Silva (richele_ag@hotmail.com) - Exact email match with 'richele_ag@hotmail.com'
DELETE FROM goals WHERE user_id = 'cad2f229-fc12-4d8d-91e2-ae2b6443d737';
DELETE FROM weekly_actions WHERE user_id = 'cad2f229-fc12-4d8d-91e2-ae2b6443d737';
DELETE FROM leads WHERE user_id = 'cad2f229-fc12-4d8d-91e2-ae2b6443d737';
DELETE FROM content_items WHERE user_id = 'cad2f229-fc12-4d8d-91e2-ae2b6443d737';
DELETE FROM chat_history WHERE user_id = 'cad2f229-fc12-4d8d-91e2-ae2b6443d737';
DELETE FROM action_plans WHERE user_id = 'cad2f229-fc12-4d8d-91e2-ae2b6443d737';
DELETE FROM usage_tracking WHERE user_id = 'cad2f229-fc12-4d8d-91e2-ae2b6443d737';
DELETE FROM image_history WHERE user_id = 'cad2f229-fc12-4d8d-91e2-ae2b6443d737';
DELETE FROM objection_history WHERE user_id = 'cad2f229-fc12-4d8d-91e2-ae2b6443d737';
DELETE FROM users WHERE id = 'cad2f229-fc12-4d8d-91e2-ae2b6443d737';

-- User: Sabrina Pereira da Costa (contato@tuafesta.com.br) - Exact email match with 'contato@tuafesta.com.br'
DELETE FROM goals WHERE user_id = '9d821a5d-7b78-4243-94b4-de7610f808b5';
DELETE FROM weekly_actions WHERE user_id = '9d821a5d-7b78-4243-94b4-de7610f808b5';
DELETE FROM leads WHERE user_id = '9d821a5d-7b78-4243-94b4-de7610f808b5';
DELETE FROM content_items WHERE user_id = '9d821a5d-7b78-4243-94b4-de7610f808b5';
DELETE FROM chat_history WHERE user_id = '9d821a5d-7b78-4243-94b4-de7610f808b5';
DELETE FROM action_plans WHERE user_id = '9d821a5d-7b78-4243-94b4-de7610f808b5';
DELETE FROM usage_tracking WHERE user_id = '9d821a5d-7b78-4243-94b4-de7610f808b5';
DELETE FROM image_history WHERE user_id = '9d821a5d-7b78-4243-94b4-de7610f808b5';
DELETE FROM objection_history WHERE user_id = '9d821a5d-7b78-4243-94b4-de7610f808b5';
DELETE FROM users WHERE id = '9d821a5d-7b78-4243-94b4-de7610f808b5';

-- User: Sezinanda Aline de Morais (sezinandamorais@gmail.com) - Exact email match with 'sezinandamorais@gmail.com'
DELETE FROM goals WHERE user_id = 'e5bba460-96d7-45ea-a3b3-7a8a76f5a37e';
DELETE FROM weekly_actions WHERE user_id = 'e5bba460-96d7-45ea-a3b3-7a8a76f5a37e';
DELETE FROM leads WHERE user_id = 'e5bba460-96d7-45ea-a3b3-7a8a76f5a37e';
DELETE FROM content_items WHERE user_id = 'e5bba460-96d7-45ea-a3b3-7a8a76f5a37e';
DELETE FROM chat_history WHERE user_id = 'e5bba460-96d7-45ea-a3b3-7a8a76f5a37e';
DELETE FROM action_plans WHERE user_id = 'e5bba460-96d7-45ea-a3b3-7a8a76f5a37e';
DELETE FROM usage_tracking WHERE user_id = 'e5bba460-96d7-45ea-a3b3-7a8a76f5a37e';
DELETE FROM image_history WHERE user_id = 'e5bba460-96d7-45ea-a3b3-7a8a76f5a37e';
DELETE FROM objection_history WHERE user_id = 'e5bba460-96d7-45ea-a3b3-7a8a76f5a37e';
DELETE FROM users WHERE id = 'e5bba460-96d7-45ea-a3b3-7a8a76f5a37e';

-- User: Shana da Costa Frainer (shanafrainer@gmail.com) - Exact email match with 'shanafrainer@gmail.com'
DELETE FROM goals WHERE user_id = 'c7bdce43-edd6-4049-ae82-1ea799c63e64';
DELETE FROM weekly_actions WHERE user_id = 'c7bdce43-edd6-4049-ae82-1ea799c63e64';
DELETE FROM leads WHERE user_id = 'c7bdce43-edd6-4049-ae82-1ea799c63e64';
DELETE FROM content_items WHERE user_id = 'c7bdce43-edd6-4049-ae82-1ea799c63e64';
DELETE FROM chat_history WHERE user_id = 'c7bdce43-edd6-4049-ae82-1ea799c63e64';
DELETE FROM action_plans WHERE user_id = 'c7bdce43-edd6-4049-ae82-1ea799c63e64';
DELETE FROM usage_tracking WHERE user_id = 'c7bdce43-edd6-4049-ae82-1ea799c63e64';
DELETE FROM image_history WHERE user_id = 'c7bdce43-edd6-4049-ae82-1ea799c63e64';
DELETE FROM objection_history WHERE user_id = 'c7bdce43-edd6-4049-ae82-1ea799c63e64';
DELETE FROM users WHERE id = 'c7bdce43-edd6-4049-ae82-1ea799c63e64';

-- User: Silvana fatima weyh (silvanaweyh31@gmail.com) - Exact email match with 'silvanaweyh31@gmail.com'
DELETE FROM goals WHERE user_id = 'e1192ba7-321b-4ca1-8c03-5a03ad7c079d';
DELETE FROM weekly_actions WHERE user_id = 'e1192ba7-321b-4ca1-8c03-5a03ad7c079d';
DELETE FROM leads WHERE user_id = 'e1192ba7-321b-4ca1-8c03-5a03ad7c079d';
DELETE FROM content_items WHERE user_id = 'e1192ba7-321b-4ca1-8c03-5a03ad7c079d';
DELETE FROM chat_history WHERE user_id = 'e1192ba7-321b-4ca1-8c03-5a03ad7c079d';
DELETE FROM action_plans WHERE user_id = 'e1192ba7-321b-4ca1-8c03-5a03ad7c079d';
DELETE FROM usage_tracking WHERE user_id = 'e1192ba7-321b-4ca1-8c03-5a03ad7c079d';
DELETE FROM image_history WHERE user_id = 'e1192ba7-321b-4ca1-8c03-5a03ad7c079d';
DELETE FROM objection_history WHERE user_id = 'e1192ba7-321b-4ca1-8c03-5a03ad7c079d';
DELETE FROM users WHERE id = 'e1192ba7-321b-4ca1-8c03-5a03ad7c079d';

-- User: Silvana tuchtenhagen (silvanapel@hotmail.com) - Exact email match with 'silvanapel@hotmail.com'
DELETE FROM goals WHERE user_id = '40520722-32d6-443b-90f2-3ee6914dc95e';
DELETE FROM weekly_actions WHERE user_id = '40520722-32d6-443b-90f2-3ee6914dc95e';
DELETE FROM leads WHERE user_id = '40520722-32d6-443b-90f2-3ee6914dc95e';
DELETE FROM content_items WHERE user_id = '40520722-32d6-443b-90f2-3ee6914dc95e';
DELETE FROM chat_history WHERE user_id = '40520722-32d6-443b-90f2-3ee6914dc95e';
DELETE FROM action_plans WHERE user_id = '40520722-32d6-443b-90f2-3ee6914dc95e';
DELETE FROM usage_tracking WHERE user_id = '40520722-32d6-443b-90f2-3ee6914dc95e';
DELETE FROM image_history WHERE user_id = '40520722-32d6-443b-90f2-3ee6914dc95e';
DELETE FROM objection_history WHERE user_id = '40520722-32d6-443b-90f2-3ee6914dc95e';
DELETE FROM users WHERE id = '40520722-32d6-443b-90f2-3ee6914dc95e';

-- User: Stephany Naves Bravos (ste.bravos@gmail.com) - Exact email match with 'ste.bravos@gmail.com'
DELETE FROM goals WHERE user_id = '544ac815-caa3-42e7-92f7-6cd63d588869';
DELETE FROM weekly_actions WHERE user_id = '544ac815-caa3-42e7-92f7-6cd63d588869';
DELETE FROM leads WHERE user_id = '544ac815-caa3-42e7-92f7-6cd63d588869';
DELETE FROM content_items WHERE user_id = '544ac815-caa3-42e7-92f7-6cd63d588869';
DELETE FROM chat_history WHERE user_id = '544ac815-caa3-42e7-92f7-6cd63d588869';
DELETE FROM action_plans WHERE user_id = '544ac815-caa3-42e7-92f7-6cd63d588869';
DELETE FROM usage_tracking WHERE user_id = '544ac815-caa3-42e7-92f7-6cd63d588869';
DELETE FROM image_history WHERE user_id = '544ac815-caa3-42e7-92f7-6cd63d588869';
DELETE FROM objection_history WHERE user_id = '544ac815-caa3-42e7-92f7-6cd63d588869';
DELETE FROM users WHERE id = '544ac815-caa3-42e7-92f7-6cd63d588869';

-- User: tainá natalia haack (tainahaack@gmail.com) - Exact email match with 'tainahaack@gmail.com'
DELETE FROM goals WHERE user_id = '960e0200-6152-478d-a2b5-625373dcb277';
DELETE FROM weekly_actions WHERE user_id = '960e0200-6152-478d-a2b5-625373dcb277';
DELETE FROM leads WHERE user_id = '960e0200-6152-478d-a2b5-625373dcb277';
DELETE FROM content_items WHERE user_id = '960e0200-6152-478d-a2b5-625373dcb277';
DELETE FROM chat_history WHERE user_id = '960e0200-6152-478d-a2b5-625373dcb277';
DELETE FROM action_plans WHERE user_id = '960e0200-6152-478d-a2b5-625373dcb277';
DELETE FROM usage_tracking WHERE user_id = '960e0200-6152-478d-a2b5-625373dcb277';
DELETE FROM image_history WHERE user_id = '960e0200-6152-478d-a2b5-625373dcb277';
DELETE FROM objection_history WHERE user_id = '960e0200-6152-478d-a2b5-625373dcb277';
DELETE FROM users WHERE id = '960e0200-6152-478d-a2b5-625373dcb277';

-- User: Taíse Seben (taiseseben@yahoo.com.br) - Exact email match with 'taiseseben@yahoo.com.br'
DELETE FROM goals WHERE user_id = '3ec995cb-dd28-4022-8b79-66037c26b0a5';
DELETE FROM weekly_actions WHERE user_id = '3ec995cb-dd28-4022-8b79-66037c26b0a5';
DELETE FROM leads WHERE user_id = '3ec995cb-dd28-4022-8b79-66037c26b0a5';
DELETE FROM content_items WHERE user_id = '3ec995cb-dd28-4022-8b79-66037c26b0a5';
DELETE FROM chat_history WHERE user_id = '3ec995cb-dd28-4022-8b79-66037c26b0a5';
DELETE FROM action_plans WHERE user_id = '3ec995cb-dd28-4022-8b79-66037c26b0a5';
DELETE FROM usage_tracking WHERE user_id = '3ec995cb-dd28-4022-8b79-66037c26b0a5';
DELETE FROM image_history WHERE user_id = '3ec995cb-dd28-4022-8b79-66037c26b0a5';
DELETE FROM objection_history WHERE user_id = '3ec995cb-dd28-4022-8b79-66037c26b0a5';
DELETE FROM users WHERE id = '3ec995cb-dd28-4022-8b79-66037c26b0a5';

-- User: Thayrine Keren Lima Teixeira (karenthayrine@gmail.com) - Exact email match with 'karenthayrine@gmail.com'
DELETE FROM goals WHERE user_id = 'bff57a20-9e1d-4019-93c7-eba93ceab45e';
DELETE FROM weekly_actions WHERE user_id = 'bff57a20-9e1d-4019-93c7-eba93ceab45e';
DELETE FROM leads WHERE user_id = 'bff57a20-9e1d-4019-93c7-eba93ceab45e';
DELETE FROM content_items WHERE user_id = 'bff57a20-9e1d-4019-93c7-eba93ceab45e';
DELETE FROM chat_history WHERE user_id = 'bff57a20-9e1d-4019-93c7-eba93ceab45e';
DELETE FROM action_plans WHERE user_id = 'bff57a20-9e1d-4019-93c7-eba93ceab45e';
DELETE FROM usage_tracking WHERE user_id = 'bff57a20-9e1d-4019-93c7-eba93ceab45e';
DELETE FROM image_history WHERE user_id = 'bff57a20-9e1d-4019-93c7-eba93ceab45e';
DELETE FROM objection_history WHERE user_id = 'bff57a20-9e1d-4019-93c7-eba93ceab45e';
DELETE FROM users WHERE id = 'bff57a20-9e1d-4019-93c7-eba93ceab45e';

-- User: Thayrine keren lima Teixeira  (kerenthayrine@gmail.com) - Confirmed name match 'Thayrine keren lima Teixeira '
DELETE FROM goals WHERE user_id = 'e015ff82-324b-4e25-90a0-24aab48e5255';
DELETE FROM weekly_actions WHERE user_id = 'e015ff82-324b-4e25-90a0-24aab48e5255';
DELETE FROM leads WHERE user_id = 'e015ff82-324b-4e25-90a0-24aab48e5255';
DELETE FROM content_items WHERE user_id = 'e015ff82-324b-4e25-90a0-24aab48e5255';
DELETE FROM chat_history WHERE user_id = 'e015ff82-324b-4e25-90a0-24aab48e5255';
DELETE FROM action_plans WHERE user_id = 'e015ff82-324b-4e25-90a0-24aab48e5255';
DELETE FROM usage_tracking WHERE user_id = 'e015ff82-324b-4e25-90a0-24aab48e5255';
DELETE FROM image_history WHERE user_id = 'e015ff82-324b-4e25-90a0-24aab48e5255';
DELETE FROM objection_history WHERE user_id = 'e015ff82-324b-4e25-90a0-24aab48e5255';
DELETE FROM users WHERE id = 'e015ff82-324b-4e25-90a0-24aab48e5255';

-- User: Thaís Patricia Hammes (paty_cris18@hotmail.com) - Exact email match with 'paty_cris18@hotmail.com'
DELETE FROM goals WHERE user_id = 'dce01041-7b50-4df8-a437-e79898d2f415';
DELETE FROM weekly_actions WHERE user_id = 'dce01041-7b50-4df8-a437-e79898d2f415';
DELETE FROM leads WHERE user_id = 'dce01041-7b50-4df8-a437-e79898d2f415';
DELETE FROM content_items WHERE user_id = 'dce01041-7b50-4df8-a437-e79898d2f415';
DELETE FROM chat_history WHERE user_id = 'dce01041-7b50-4df8-a437-e79898d2f415';
DELETE FROM action_plans WHERE user_id = 'dce01041-7b50-4df8-a437-e79898d2f415';
DELETE FROM usage_tracking WHERE user_id = 'dce01041-7b50-4df8-a437-e79898d2f415';
DELETE FROM image_history WHERE user_id = 'dce01041-7b50-4df8-a437-e79898d2f415';
DELETE FROM objection_history WHERE user_id = 'dce01041-7b50-4df8-a437-e79898d2f415';
DELETE FROM users WHERE id = 'dce01041-7b50-4df8-a437-e79898d2f415';

-- User: Werinton Martins (diamondgoldcursos@gmail.com) - Exact email match with 'diamondgoldcursos@gmail.com'
DELETE FROM goals WHERE user_id = 'c2929a6c-6c3a-475f-b305-9e11c358010e';
DELETE FROM weekly_actions WHERE user_id = 'c2929a6c-6c3a-475f-b305-9e11c358010e';
DELETE FROM leads WHERE user_id = 'c2929a6c-6c3a-475f-b305-9e11c358010e';
DELETE FROM content_items WHERE user_id = 'c2929a6c-6c3a-475f-b305-9e11c358010e';
DELETE FROM chat_history WHERE user_id = 'c2929a6c-6c3a-475f-b305-9e11c358010e';
DELETE FROM action_plans WHERE user_id = 'c2929a6c-6c3a-475f-b305-9e11c358010e';
DELETE FROM usage_tracking WHERE user_id = 'c2929a6c-6c3a-475f-b305-9e11c358010e';
DELETE FROM image_history WHERE user_id = 'c2929a6c-6c3a-475f-b305-9e11c358010e';
DELETE FROM objection_history WHERE user_id = 'c2929a6c-6c3a-475f-b305-9e11c358010e';
DELETE FROM users WHERE id = 'c2929a6c-6c3a-475f-b305-9e11c358010e';
