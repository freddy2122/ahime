# 👤 Créer un Compte Administrateur

Ce guide vous explique comment créer votre premier compte administrateur pour accéder au dashboard admin.

## 📋 Méthode 1 : Via l'Interface Web (Recommandé)

### Étape 1 : S'inscrire
1. Allez sur votre site : `http://localhost:5173` (ou votre URL de production)
2. Cliquez sur **"S'inscrire"** ou allez sur `/register`
3. Remplissez le formulaire :
   - Prénom
   - Nom
   - Email
   - Téléphone
   - Mot de passe
4. Cliquez sur **"Créer mon compte"**
5. Vérifiez votre email et confirmez votre compte (si l'email est activé dans Supabase)

### Étape 2 : Modifier le rôle en Admin
1. Allez dans votre **Supabase Dashboard**
2. Cliquez sur **Table Editor** dans le menu de gauche
3. Sélectionnez la table **`user_profiles`**
4. Trouvez votre utilisateur (recherchez par email)
5. Cliquez sur la ligne pour l'éditer
6. Modifiez le champ **`role`** de `customer` à `admin`
7. Cliquez sur **Save**

### Étape 3 : Se connecter en tant qu'Admin
1. Déconnectez-vous si vous êtes connecté
2. Connectez-vous avec votre email et mot de passe
3. Allez sur `/admin` - vous devriez maintenant avoir accès au dashboard admin !

---

## 📋 Méthode 2 : Via SQL (Plus rapide)

### Étape 1 : S'inscrire via l'interface
1. Créez votre compte via `/register` comme dans la Méthode 1

### Étape 2 : Exécuter le script SQL
1. Allez dans **SQL Editor** dans Supabase
2. Exécutez ce script en remplaçant `votre-email@exemple.com` par votre email :

```sql
-- Mettre à jour le rôle d'un utilisateur en admin
UPDATE user_profiles
SET role = 'admin'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'votre-email@exemple.com'
);
```

3. Vérifiez que la mise à jour a fonctionné :
```sql
-- Vérifier le rôle
SELECT 
  u.email,
  up.role,
  up.first_name,
  up.last_name
FROM auth.users u
JOIN user_profiles up ON u.id = up.id
WHERE u.email = 'votre-email@exemple.com';
```

---

## 📋 Méthode 3 : Créer directement via SQL (Avancé)

Si vous préférez créer l'utilisateur directement via SQL :

```sql
-- 1. Créer l'utilisateur dans auth.users (nécessite l'extension Supabase)
-- Note: Cette méthode nécessite des privilèges spéciaux
-- Il est recommandé d'utiliser la Méthode 1 ou 2

-- 2. Créer le profil avec le rôle admin
INSERT INTO user_profiles (id, first_name, last_name, role, status)
VALUES (
  'uuid-de-votre-utilisateur', -- Récupéré depuis auth.users
  'Admin',
  'Ahimè',
  'admin',
  'active'
);
```

---

## ✅ Vérification

Après avoir créé votre compte admin, vérifiez que tout fonctionne :

1. **Se connecter** : `/login`
2. **Accéder au dashboard** : `/admin`
3. **Vérifier les notifications** : Cloche en haut à droite
4. **Tester la création** : `/admin/products/new` ou `/admin/categories/new`

---

## 🔐 Sécurité

- ⚠️ **Ne créez pas trop de comptes admin** - Limitez-vous à 1-3 administrateurs
- ⚠️ **Utilisez des mots de passe forts** pour les comptes admin
- ⚠️ **Activez l'authentification à deux facteurs** si possible (via Supabase)

---

## 🆘 Problèmes courants

### "Je ne peux pas accéder à /admin"
- Vérifiez que le `role` est bien `admin` dans `user_profiles`
- Déconnectez-vous et reconnectez-vous
- Videz le cache du navigateur

### "Le rôle n'a pas changé"
- Vérifiez que vous avez bien modifié la bonne ligne dans `user_profiles`
- Vérifiez que l'`id` correspond bien à votre utilisateur dans `auth.users`

### "Je ne vois pas la table user_profiles"
- Vérifiez que vous avez bien exécuté `supabase-complete-setup.sql`
- Vérifiez que vous êtes dans le bon projet Supabase

---

## 📚 Prochaines étapes

Une fois votre compte admin créé :

1. ✅ Créer des catégories et sous-catégories (`/admin/categories/new`)
2. ✅ Ajouter des produits (`/admin/products/new`)
3. ✅ Configurer les paramètres (`/admin/settings`)
4. ✅ Voir les statistiques (`/admin/stats`)

---

**Bon courage ! 🚀**
