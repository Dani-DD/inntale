# INNTALE CAMPAIGNS

#### Author: Daniele Natola

#### Video Demo: [CS50x final project video demo - InnTale Campaigns](https://youtu.be/FjdGBay5ilY)

# 0. DISCLAIMER

To use this app, you only need to read the following sections:

1. INTRO
2. INSTALLATION AND SETUP (just the first part)
3. USER INTERFACE

The remaining sections are meant for those interested in how the app works under the hood, or who want to explore the internal logic and implementation details.

# 1. INTRO

In my country, there's a quite popular YouTube channel called [InnTale](https://www.youtube.com/@InnTale). They are a group of friends who create videos about tabletop role-playing games and board games, sharing advice, explanations, guides, tips, and more.  
However, their main focus is recording game campaigns.  
Some campaigns are filmed in their own studio and then edited in post-production: these are published on their main YouTube channel, where they are organized into playlists.  
Others are streamed live on Twitch and later uploaded to their secondary channel, [InnTale TV](https://www.youtube.com/@InnTaleTV), always in playlists, but without editing.  
Since these playlists are spread across two different channels and mixed in with others, covering different topics, I decided to create a small website that lists all of their campaign playlists, making it easier for you to find the one you’re looking for.  
(Well, not every playlist just yet. Only a few, for now. Let's say it's an Early Access).  
**_This Full-Stack web app uses Django for the backend and React for the frontend, with Django REST Framework powering the API layer._**

# 2. INSTALLATION AND SETUP

1.  Clone the project's source code to your local machine.
2.  [Install Docker](https://dev.to/abhay_yt_52a8e72b213be229/how-to-install-docker-on-windows-macos-and-linux-a-step-by-step-guide-3a2i) and make sure it’s running (not familiar with Docker? Here's a [quick explainer](https://www.youtube.com/watch?v=DQdB7wFEygo)).
3.  In the root `Inntale` folder, create a `.env` file with the following environment variables:

    ```
    MYSQL_ROOT_PSW=<choose a password for the MySQL root user>
    MYSQL_DATABASE=campaigns
    MYSQL_HOST=database_mysql
    MYSQL_HOST_PORT=3306
    MYSQL_USER=inntale
    MYSQL_PSW=<choose a password for the inntale user>
    ```

4.  In your CLI, run:

    ```bash
    docker-compose up --build
    ```

    This step may take a few minutes, depending on your system.

5.  Open your browser to access the app:

    -   Backend: `http://127.0.0.1:8000`
    -   Frontend: `http://localhost:5173`

By default, the database starts empty.  
You can seed it with initial values by running:

```bash
docker exec -it inntale_backend python manage.py populatedatabase
```

## IMPLEMENTATION DETAILS

This is a multi-container application defined via `docker-compose.yml`, which includes three services:

-   `backend_django`: the backend (Django + Python)
-   `frontend_react`: the frontend (React + Vite)
-   `database_mysql`: the MySQL database

### WAIT-FOR-IT SCRIPT

[wait-for-it.sh](https://wait-for-it.readthedocs.io/en/latest/) is used to ensure that `database_mysql` is fully up and running before starting `backend_django` and `frontend_react`.

### THE NODE_MODULES VOLUME ISSUE

To resolve a known bug with Vite/Node.js on cross-platform setups, I explicitly handle the `node_modules` directory.

**The error:**

```
Error: Cannot find module @rollup/rollup-linux-x64-gnu. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try npm i again after removing both package-lock.json and node_modules directory.
```

This occurs when running a Vite project across different operating systems. Rollup, the bundler used by Vite, installs platform-specific binaries. If dependencies are installed on one OS (e.g. Windows), and later run on another (e.g. Linux inside Docker), the binaries may be incompatible or missing altogether.

**In this setup:**

During the Docker image build process, the `frontend_react` service installs its dependencies using `npm install` inside the container (which runs on Linux). This creates a `node_modules` directory with Linux-compatible binaries.
However, when mounting `./frontend_react:/app`, everything from the host machine (in this case, Windows) is copied into the container’s `/app` directory, including the local `node_modules` folder, if it exists.
As a result, the host’s Windows-specific `node_modules` ends up replacing the Linux-compatible one generated inside the container, causing a mismatch in platform-specific dependencies.

**The solution:**

To solve this issue, I explicitly mount a named volume at `/app/node_modules` within the container.
Unlike the project folder mount (`./frontend_react:/app`), this volume does not come from the host and therefore doesn’t include any incompatible dependencies.

```yaml
# docker-compose.yml snippet
volumes:
    - ./frontend_react:/app
    - node_modules_volume:/app/node_modules
```

### MYSQL-INIT.SQL

This file grants administrative privileges to the `inntale` user defined in the `.env` file, allowing it to perform full CRUD operations on the database.

The volume mapping `./backend_django/mysql-init.sql:/docker-entrypoint-initdb.d/mysql-init.sql` declared in the `database_mysql` service ensures that the script is executed the first time the database container is initialized.

MySQL automatically runs any `.sql` scripts placed in the `/docker-entrypoint-initdb.d/` directory during initial setup. This is a built-in feature of the official MySQL Docker image.

### THE POPULATEDATABASE COMMAND

It's a custom command defined in:

```text
/Inntale
    /backend_django
        /campaigns
            /management
                /commands
                    populate-database.sql
                    populatedatabase.py
```

Basically, it reads the content of the `populate-database.sql` file, that contains SQL `INSERT` statements, and then execute it using the Django's `connection` module.

# 3. USER INTERFACE

## MAIN FEATURE

The core of the application is a grid of cards displayed in the main section of the page.  
Each card represents a campaign and includes information about:

-   the campaign name.
-   the season.
-   the rulebook used.
-   whether it's been edited.
-   the cast involved.
-   the worldbuilding used.

And, of course, it's included a button that links directly to the corresponding YouTube playlist.

## FEATURE 1: ORDERING

At the top of the grid there is a button that allows you to choose how to sort the cards.  
For now, there are two options: by name and by release date (both in ascending and descending order).

## FEATURE 2: FILTERING

Using the sidebar, you can filter the cards by rulebook, player, and/or setting.  
This feature is only available on PC, as the sidebar isn't displayed on smaller devices.

## FEATURE 3: SEARCHING

At the top of the page there is a search bar that you can use to search for campaigns by manual, player, or setting. You can also directly type the name of the campaign you're looking for.

## FEATURE 4: WATCHLISTS

If you create an account and log in, a new button will appear in the cards: you can click on it to insert a specific campaign in your personal watchlist, available on your user page (just click on your username to be redirected there. Then, if you want to go back to the main page, click on the logo at the top left corner of the page).

## FEATURE 5 (ADMIN ONLY): DJANGO ADMIN APP

The backend of this application is built using Django, so Admins can access the admin app to manipulate the database, adding new campaigns, players, manuals and so on.

# 4. BUILDING THE GRID OF CAMPAIGNS

## THE BACKEND

The primary endpoint of the application is `/campaigns/`, which handles GET requests to retrieve a list of campaign objects displayed in the main area of the interface.

Each campaign is represented by the `Campaign` model, which includes:

-   the name
-   the season
-   the manual (ForeignKey to Manual)
-   the setting (ForeignKey to Setting)
-   if it's edited
-   the link to the YouTube playlist
-   the release date
-   the thumbnail (an image associated to the campaign, optional)
-   the slug (used as an additional resource identifier for GET-DETAIL requests)

In addition, each campaign has a reverse foreign key relationship to the `Cast` model, which exposes the full cast of the campaign, listing players and their characters.

### IMPLEMENTATION DETAILS

#### THE SLUGMODEL CLASS

The `Campaign`, `Manual`, `Player`, and `Setting` models each include a `slug` field.  
All of them have the same behavior: when a new instance is created and the field is left empty, it is automatically populated.

```python
def save(self, *args, **kwargs):
    if not self.slug:
        self.slug = slugify(...)
    super().save(*args, **kwargs)
```

To avoid repeating the same code across multiple models, this logic is encapsulated in an abstract base class that the others inherit from:

```py
class SlugModel(models.Model):
    """
    Several models share the same logic for handling the slug field.
    This base class wraps that logic to promote reuse and consistency.
    """

    slug = models.SlugField(unique=True, blank=True)

    class Meta:
        abstract = True

    @abstractmethod
    def get_slug_source(self):
        pass

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.get_slug_source)
        super().save(*args, **kwargs)
```

Classes that extend the base `SlugModel` must override the `get_slug_source()` method to define which string should be used to generate the slug.

#### THE SLUGVIEWSET

The `CampaignViewSet`, `ManualViewSet`, `SettingViewSet`, and `PlayerViewSet` all share the same behavior: they use both `id` and `slug` as resource identifiers. To promote code reuse, this shared logic has been encapsulated in a custom base viewset class, which each of these inherits from.

## THE FRONTEND

I use the `CampaignGrid` component (`/src/components/main`) to fetch the campaign list from the server.
Then, each item of the list is rendered using the `CampaignCard` component.

For now, don't think about the following features:

-   `const watchlist = useWatchlistStore((s) => s.watchlist);`
-   `const filters = useFiltersStore((s) => s.filters);`
-   `const { addToWatchlist } = useWatchlistStore();`
-   `const { user } = useContext(AuthContext);`
-   `const privateAxiosObject = usePrivateAxios();`

They'll be explained in later sections.

The `CampaignCard` component renders:

-   The `Label` component, which displays a simple tag indicating whether the campaign has been edited.
-   The `CastAccordion` component, which renders an accordion containing cast details via the `PlayerCredit` component.
-   The `YouTubeButtonLink` component, which displays a link button to the campaign's YouTube playlist.

Here’s a quick structural recap:

```text
CampaignGrid
   └── CampaignCard
         ├── Label
         ├── CastAccordion
         │     └── PlayerCredit
         └── YouTubeButtonLink
```

### IMPLEMENTATION DETAILS

#### FETCHING DATA

To retrieve data from the server, I use the `axios` instance provided by the `Axios` library.  
The logic is encapsulated in a custom hook called `useData`, so we can use it multiple times without repeating the code:

> _(The examples below are a simplified version for demonstration purposes. The complete implementation is explained further down)._

```ts
const useData = <T>(endpoint: string) => {
    const [fetchedData, setFetchedData] = useState<T[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch data
    useEffect(() => {
        const controller = new AbortController();

        axios
            .get<T[]>(endpoint)
            .then((response) => {
                setIsLoading(false);
                setFetchedData(response.data);
            })
            .catch((error: Error) => {
                if (error instanceof CanceledError) return;
                setError(error.message);
                setIsLoading(false);
            });

        return () => controller.abort();
    }, [filters]);

    return { fetchedData, error, isLoading };
};

export default useData;
```

The `useData` hook is designed to retrieve data from a generic endpoint. To specifically fetch campaigns, I define another custom hook, `useCampaigns`, which wraps `useData` and pass to it the right endpoint:

```ts
const useCampaigns = () => {
    const {
        fetchedData: campaigns,
        error,
        isLoading,
    } = useData<Campaign>(`${ORIGIN}root/campaigns/`);

    return { campaigns, error, isLoading };
};

export default useCampaigns;
```

# 5. ENABLING SORTING, FILTERING AND SEARCHING CAMPAIGNS

## THE BACKEND

These features are enabled by configuring the `CampaignViewSet` with the following classes:

-   **Sorting**: `OrderingFilter` from `rest_framework.filters`
-   **Searching**: `SearchFilter` from `rest_framework.filters`
-   **Filtering**: `DjangoFilterBackend` from the `django_filters.rest_framework` module  
    _(this is a third-party module and must be installed separately)_

## THE FRONTEND

Axios methods accept an optional `AxiosRequestConfig` object, which lets you customize HTTP requests, for example, by adding query parameters.

In this project, I use that object to inject query parameters for sorting, searching, and filtering.

To manage and update these parameters, I’ve implemented a Zustand store at:  
`Inntale/frontend_react/src/stores/FiltersStore.ts`

When the user clicks on a button of the sidebar, search a string using the search bar or choose a sort criteria using the apposite component, an event handler update the store state via exposed functions.

The `useData` hook takes that state as argument and extracts its relevant values into the `AxiosRequestConfig` object:

> _(Note: This is a simplified version for demonstration purposes. The full implementation is detailed later.)_

```ts
const useData = <T>(endpoint: string, filters?: Filters) => {
    const [fetchedData, setFetchedData] = useState<T[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch data
    useEffect(() => {
        const controller = new AbortController();

        axios
            .get<T[]>(endpoint, {
                signal: controller.signal,
                // Here!
                params: {
                    manual: filters?.selected_manual,
                    setting: filters?.selected_setting,
                    campaign_cast__player: filters?.selected_player,
                    search: filters?.search,
                    ordering: filters?.ordering,
                },
            })
            .then((response) => {
                setIsLoading(false);
                setFetchedData(response.data);
            })
            .catch((error: Error) => {
                if (error instanceof CanceledError) return;
                setError(error.message);
                setIsLoading(false);
            });

        return () => controller.abort();
    }, [filters]);

    return { fetchedData, error, isLoading };
};

export default useData;
```

The `useCampaigns` hook is now updated to accept a `Filters` object, which it forwards to `useData`.
Beside, I've implemented new hooks for specifically fetch manuals, players and settings showed in the sidebar. They follow the same logic of `useCampaigns` and are: `useManuals`, `usePlayers` and `useSettings`.

Additionally, I've implemented new hooks, `useManuals`, `usePlayers`, and `useSettings` that are used to fetch the data displayed in the sidebar.
They follow the same logic as `useCampaigns`.

# 6. BUILDING THE SIDEBAR

## THE BACKEND

These are the endpoints for fetching data:

-   `/manuals/` -> handles GET requests to retrieve the list of `Manual` objects.
-   `/players/` -> handles GET requests to retrieve the list of `Player` objects.
-   `/settings/` -> handles GET requests to retrieve the list of `Setting` objects.

### IMPLEMENTATION DETAILS

#### THE MANUALANDSETTING CLASS

Because the `Manual` and the `Setting` model are very similar, I've decided to handle them using a common base class that inherits from the `SlugModel` one.

#### MANUALANDSETTING MANAGER AND PLAYERMANAGER

These managers implement a method that annotate:

-   how many times a manual/setting has been used.
-   how many campaigns each player has played.

## THE FRONTEND

These are the component used:

```text
ManualsList  -> ExpandableList -> FilteringButton
PlayersList  ->
SettingsList ->
```

### THE FILTERINGBUTTON COMPONENT

This component represents a single list item in the sidebar.

**Visually**, a `FilteringButton` typically includes:

-   A logo or image (e.g. the manual's logo or the player's profile picture)
-   A name (e.g. the manual’s title or the player’s full name)
-   A counter indicating how many times a manual has been used, a player has participated, etc.

All this information is passed to the component via props.

**Behaviorally**, the component also handles filter query parameter: when clicked, it triggers an `onClick` handler that updates the `FilterStore` state.

Some `FilteringButton` instances are visually simpler: they display only a text label, with no logo or counter, for example: "All manuals", "All players", and "All settings".  
These variants are used to **clear** a specific filter by setting its corresponding query parameter to `undefined`.

### THE EXPANDABLELIST COMPONENT

This component represents an expandable/collapsible list.  
It consists of three main elements:

-   A header
-   A list of items (each rendered using the `FilteringButton` component)
-   A final item — a button used to toggle the list’s expanded or collapsed state

This component can be reused to display different types of lists, such as `Player[]`, `Manual[]`, or `Setting[]`.

How?  
Each array is first converted into a common format that the component can render: a `ListItem[]`  
(`Inntale/frontend_react/src/interfaces/ListItem.ts`).  
This conversion is handled by the parent component, for example, `<ManualsList />` or `<PlayersList />`,
and will be explained in the next section.  
The key idea is that `ExpandableList` only concerns itself with rendering: it receives a normalized list and doesn’t need to know anything about the original data structure.

### MANUALSIST, PLAYERSLIST AND SETTINGSLIST COMPONENTS

Each of these components uses the corresponding custom hook (`useManuals`, `usePlayers`, and `useSettings`) to fetch their respective data arrays from the server (`Manual[]`, `Player[]`, `Setting[]`). The retrieved list is then mapped to a `ListItem[]`, a normalized structure that can be rendered by the `ExpandableList` component.

Each `ListItem` contains all the information needed by the `FilteringButton` component to display and behave correctly:

-   an image (e.g. the manual’s logo or the player’s profile picture)
-   a display label (e.g. the manual’s title or the player’s name)
-   a counter (e.g. how many times a manual was used, or how many campaigns a player has participated in)
-   a descriptor indicating what the item represents (manual, player, or setting). This is important to determine which method from the `FilterStore` should be triggered (for example, clicking a button that represents a manual will call `setSelectedManual` with the corresponding ID).
-   the ID of the associated manual, player, or setting

Additionally, a special item is prepended to the list, used to render a `FilteringButton` that resets the filter. When clicked, it sets the related filter query parameter to `undefined`, effectively clearing that filter.

# 7. THE DYNAMICHEADING COMPONENT

This component renders a contextual heading based on the currently selected filters in the application:

-   **No filters active**: displays a single heading, `"All Campaigns"`.
-   **One or more filters applied**: displays `"Campaigns with:"` as a main header, followed by a list of subheadings (e.g. a specific manual, player, or setting).
-   **Search query present**: appends a line like `"Searching for: <query>"`.

The first step is simple: check whether any filters are active. If not, we render just `"All Campaigns"`, otherwise, we begin with `"Campaigns with:"` and generate a list of subheadings that describe each selected filter.
But here's the key: the `DynamicHeading` component can't directly display meaningful labels like like `"Brancalonia"` or `"Andrea Guagnini"` because it has access only to the selected IDs stored in the `Filters` object (e.g. `selected_manual`, `selected_player`, etc.), not to the entire `Manual`/`Player`/`Setting` object.
So to display meaningful labels, we need to:

1. Fetch the entire corresponding list (e.g. all manuals or players)
2. Look up the selected item using its ID
3. Extract its display name

Example logic:

```ts
const item = list.find((element) => element.id === filters.selected_manual);
const name = item?.name;
```

Since this logic is required for multiple filter types, it’s encapsulated in a reusable function called `createSubHeadingText`. This function takes two arguments:

-   the full list of items (e.g. `Manual[]`, `Player[]`, etc.)
-   the name of the filter key (e.g. `selected_manual`)

We then call this function for each type of filter and list, and collect the resulting strings into a single array called `subHeadingStrings`, which is rendered under the main heading.

# 8. AUTHENTICATION

## THE BACKEND

The authentication system is fully automated using two libraries:

-   [`djoser`](https://djoser.readthedocs.io/en/latest/getting_started.html)
-   [`djangorestframework_simplejwt`](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html)

On the backend, authentication requires no custom logic for basic flows. The client simply needs to make HTTP POST requests to the following endpoints:

-   `auth/users/`, used to register a new user.  
    The request payload must include all required user information.  
    The response is a JSON object containing a summary of the submitted data (excluding the password).

-   `auth/jwt/create/`, used for user login.  
    The request payload must include valid credentials.  
    The response returns two JWT tokens, an access token and a refresh token, which must be managed on the client side.

### IMPLEMENTATION DETAILS

#### REGISTERINGUSERSERIALIZER

This class extends the built-in `UserCreateSerializer` provided by `djoser` and `simplejwt`.  
It introduces the following customizations:

-   Marks additional fields as **required**: `first_name`, `last_name`, and `email`
-   Adds a new field: `repeat_password`, used to confirm password input during registration
-   Adds validation to ensure:
    -   The `password` and `repeat_password` fields match
    -   The provided email has not already been registered in the system

To finalize registration behavior, we override the `create()` method:

1. **Skip saving `repeat_password`**: since it’s included in the serializer fields, Django will attempt to store it, which would cause an error (the `User` model has no such field). We prevent this by removing it during object creation.
2. **Securely store the password**: we explicitly call `set_password()` on the new user instance to hash the password before saving it.

#### MYTOKENOBTAINPAIRSERIALIZER

I use this class to [customize token claims](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/customizing_token_claims.html).

## THE FRONTEND

### AUTHCONTEXT.TSX

To handle the authentication flow, I’ve defined three main functions:

-   **`register()`**: uses `axios.post()` to send the registration form data to the appropriate endpoint.  
    On success, it redirects the user to the homepage.

-   **`login()`**: uses `axios.post()` to send the login credentials to the authentication endpoint.  
    On success, it stores the received tokens (`access` and `refresh`) in `localStorage` and then redirects to the homepage.

-   **`logout()`**: clears both tokens from `localStorage`.

Since these functions are needed across multiple components (for example, in a form for the authentication), I **avoid prop drilling** by encapsulating everything in a custom provider: `authContext.tsx`.

This context also manages two internal states:

-   `user`: holds the currently authenticated user’s data
-   `tokens`: stores the current access and refresh tokens

This setup provides two main benefits:

1. **Global access**: any component that needs thoose info (e.g. the navbar to display the username or the usePrivateAxios for the tokens) can access it directly from the context.

2. **Reactive updates**: when authentication state changes (after registration, login, or logout), all subscribed components re-render automatically — keeping the UI in sync.

### USEPRIVATEAXIOS.TS

Once authentication is implemented, it’s common to have **protected endpoints**, routes that require a valid JWT token in the request headers in order to be accessed.

The `usePrivateAxios` hook handles this logic: it creates and returns an `Axios` instance with the proper Authorization header already configured:

```ts
const { tokens, setTokens, setUser } = useContext(AuthContext);

const axiosForProtectedEndpoints = axios.create({
    baseURL: ORIGIN,
    headers: {
        Authorization: `JWT ${tokens?.access}`,
    },
});
```

However, that alone is not enough: JWT access tokens have an expiration time. We don’t want users to be forced to log in again every time a token expires.  
To solve this, we use **Axios interceptors**, hooks that let you intercept and modify requests or responses before they are handled.  
In this case, we use a request interceptor to check whether the token has expired and, if so, to refresh it automatically before the original request is sent:

```text
Outgoing request
     ↓
Interceptor → token expired?
     ↓ yes                      ↓ no
Refresh token             Proceed normally
     ↓
Retry original request
```

In other words:

> `.interceptors.request.use(...)` tells Axios: “Before sending any request, run this function first!”

In our case, the logic says:

> “Intercept all outgoing requests, check whether the access token is expired, and if it is, fetch a new one before proceeding normally.”

### UPDATING USEDATA TO SUPPORT PROTECTED ENDPOINTS

The `useData` hook is used throughout the app to fetch data from the server.  
Originally, it relied on a standard `Axios` instance to make requests.

To support **protected endpoints** that require authentication, the hook has been updated to accept an additional boolean parameter indicating whether the target endpoint is protected.

-   if the parameter is `false`, `useData` uses the public Axios instance.
-   if `true`, it will instead use the `usePrivateAxios` hook to inject the appropriate JWT tokens into the request headers.

As a conseguence, all custom hooks that use `useData`, such as `useCampaigns`, `usePlayers`, etc., must also be updated to receive this new parameter and forward it accordingly.

This change ensures that both public and protected resources can be fetched using the same generic hook, while still enforcing authentication where necessary.

# 9. AUTHENTICATION AND REGISTRATION FORMS

## RENDERING THE FORMS

The login and registration forms share the same overall structure: a series of input fields followed by a submit button. Even their visual styling is nearly identical.

Instead of manually writing repetitive JSX, i’ve opted for a **data-driven approach**: both forms are defined by configuration arrays (`loginFormFields` and `registrationFormFields`) located in `frontend_react/src/utils/utils.ts`.
These arrays are passed as props to the form-rendering component, and each item defines:

-   the type of input field (e.g. text, password)
-   the label text
-   the form field name (used for binding to the `register` function from React Hook Form)

The form component maps over this configuration to render the form dynamically.  
It also handles inline error rendering for each input field.

> 🔘 **Note**:  
> The submit button is not part of the form component itself.  
> Instead, it is defined in the parent component (`DrawerWithForm`, a Chakra UI drawer), and connected via the `form_id_attribute`.

---

## HANDLING ERRORS

When something goes wrong (e.g. duplicate username or invalid password), both `djoser` and `djangorestframework_simplejwt` return error responses with the following structure:

```json
{
    "<field>": ["<error message>"]
}
```

For example:

```json
{
    "username": ["This username is already taken."],
    "password": [
        "This field may not be blank.",
        "Password must be at least 8 characters."
    ]
}
```

On the client side, I parse this structure to associate each error message with the relevant form's input field using the `setError` method from React Hook Form. This allows each form's field to display its own validation message.

Here’s how it works:

```ts
catch (err) {
    console.log("Handling errors...");
    const serverErrors = err as Record<string, string[] | string>;
    // Convert the JSON object into an array to simplify iteration
    Object.entries(serverErrors).forEach(([field, messages]) => {

        // Sometimes the error message is wrapped in an array, other times it's not
        // In the first case, we extract the first item from the array
        const message = Array.isArray(messages)
            ? messages[0]
            : messages;

        // This is a special case: see explanation below
        const targetField = field === "detail" ? "password" : field;

        setError(targetField as keyof UserCredentials, {
            type: "manual",
            message,
        });
    });
}
```

> 💡 Special case: `detail` field.  
> When Django can’t associate the error with a specific form field (e.g. incorrect credentials), it returns a generic `detail` key.  
> Since there’s no input field named so in the form, i map this error manually to the `password` field, which is typically where login-related errors are displayed.

# 10. BUILDING THE USER WATCHLIST

## THE BACKEND

At the `watchlist/` endpoint, **authenticated users** can perform the following actions:

-   **GET** request: retrieve the list of campaigns in their personal watchlist
-   **POST** request: add a new campaign to their watchlist

A user’s watchlist is represented as a list of `Watchlist` objects (`Inntale/backend_django/campaigns/models.py`), where each object associates a campaign with a specific user.

### IMPLEMENTATION DETAILS

#### WATCHLISTSTAFFSERIALIZER AND WATCHLISTUSERSERIALIZER

There are two serializers to handle permission differences:

-   `WatchlistStaffSerializer`: allows a staff user to manually set the `user` field when creating a new watchlist entry
-   `WatchlistUserSerializer`: intended for standard users who cannot specify the `user` directly (it’s inferred from the request context)

#### WATCHLISTUSERSERIALIZER

The serializer behaves differently depending on the request type:

-   **On POST requests**:  
    The server only expects the campaign ID.  
    Therefore, the `campaign` field is a `PrimaryKeyRelatedField`, while the user is automatically injected from `self.context['request'].user`.

-   **On GET requests**:  
    The client needs the full campaign details to render them in the UI.  
    That’s why the `campaign` field is serialized using the `CampaignSerializer` instead of just returning an ID.

## THE FRONTEND

The user's watchlist is primarily used in two components:

-   `UserPage.tsx`: renders the list as a sequence of `WatchlistCard.tsx` components
-   `CampaignGrid.tsx`: informs each `CampaignCard` whether a campaign is already in the user’s watchlist

To ensure a fully reactive experience, without reloading the page, I've implemented a Zustand store (`WatchlistStore.ts`) that holds the user's watchlist and exposes actions to modify it.
Examples of dynamic behavior:

-   when a campaign is added via the button in `CampaignCard.tsx`, its label changes from `"Add to watchlist"` to `"In watchlist"` instantly.
-   when a campaign is removed via the button in `WatchlistCard.tsx`, the list in `UserPage.tsx` updates immediately.

Behind the scenes:

-   `addToWatchlist()` is called when a new campaign is added
-   `removeFromWatchlist()` is called to remove one

Both functions update the store's state variable, causing all dependent components to re-render accordingly.

The initial value of the watchlist is set in `LoadWatchlist.tsx`: if the user is authenticated, this component fetches their watchlist from the backend and populates the store.
