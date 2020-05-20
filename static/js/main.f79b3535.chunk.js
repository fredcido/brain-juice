(this['webpackJsonp@brain-juice/frontend'] =
  this['webpackJsonp@brain-juice/frontend'] || []).push([
  [0],
  {
    115: function (e, t, a) {
      e.exports = a(176);
    },
    170: function (e, t) {},
    175: function (e, t, a) {},
    176: function (e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        c = a(7),
        l = a.n(c),
        i = a(32),
        o = a(17),
        m = a(225),
        u = a(227),
        s = a(24),
        f = a(10),
        E = a(212),
        d = a(214),
        p = a(55),
        g = a(210),
        b = Object(g.a)(function (e) {
          return {
            root: { flexGrow: 1 },
            menuButton: { marginRight: e.spacing(2) },
            link: { color: 'white', textDecoration: 'none' },
          };
        });
      var h = function () {
          var e = b();
          return r.a.createElement(
            'div',
            { className: e.root },
            r.a.createElement(
              E.a,
              { position: 'static' },
              r.a.createElement(
                d.a,
                null,
                r.a.createElement(
                  p.a,
                  { variant: 'h6' },
                  r.a.createElement(
                    s.b,
                    { to: '/', className: e.link },
                    'Brain Juice',
                  ),
                ),
              ),
            ),
          );
        },
        j = a(48),
        v = a(218),
        O = a(226),
        y = a(219),
        S = a(228),
        x = a(215),
        w = a(216),
        N = Object(g.a)({
          root: {
            minWidth: 275,
            maxWidth: '70vw',
            margin: 'auto',
            marginTop: '4em',
          },
          title: { fontSize: 16 },
        }),
        C = function (e) {
          var t = e.title,
            a = e.children,
            n = N();
          return r.a.createElement(
            x.a,
            { className: n.root },
            r.a.createElement(
              w.a,
              null,
              r.a.createElement(p.a, { component: 'h1', variant: 'h5' }, t),
              a,
            ),
          );
        },
        k = Object(g.a)(function (e) {
          return {
            paper: {
              marginTop: e.spacing(8),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
            avatar: {
              margin: e.spacing(1),
              backgroundColor: e.palette.secondary.main,
            },
            form: { width: '100%', marginTop: e.spacing(1) },
            submit: { margin: e.spacing(3, 0, 2) },
          };
        }),
        B = a(54),
        G = a.n(B),
        T = { BASE_URL: 'https://mind-juice.herokuapp.com' };
      (G.a.defaults.baseURL = T.BASE_URL),
        (G.a.defaults.headers.post['Content-Type'] = 'application/json');
      var W = G.a;
      var D = function () {
          var e = Object(f.f)(),
            t = k(),
            a = Object(n.useState)({ name: '' }),
            c = Object(o.a)(a, 2),
            l = c[0],
            m = c[1],
            u = Object(n.useState)(!1),
            s = Object(o.a)(u, 2),
            E = s[0],
            d = s[1],
            p = Object(n.useState)(''),
            g = Object(o.a)(p, 2),
            b = g[0],
            h = g[1];
          return r.a.createElement(
            C,
            { title: 'Starts a new game' },
            r.a.createElement(
              'form',
              {
                className: t.form,
                noValidate: !0,
                onSubmit: function (t) {
                  var a;
                  (t.preventDefault(), l.name) &&
                    (d(!0),
                    ((a = l),
                    W.post('/games', a).then(function (e) {
                      return e.data;
                    }))
                      .then(function (t) {
                        d(!1), e.push('/game/'.concat(t.id));
                      })
                      .catch(function () {
                        d(!1),
                          h('There was something wrong when starting the game');
                      }));
                },
              },
              r.a.createElement(O.a, {
                variant: 'outlined',
                margin: 'normal',
                required: !0,
                fullWidth: !0,
                id: 'name',
                label: 'Game name',
                name: 'name',
                error: !Boolean(l.name),
                value: l.name,
                onChange: function (e) {
                  var t = e.target,
                    a = t.name,
                    n = t.value;
                  m(Object(i.a)(Object(i.a)({}, l), {}, Object(j.a)({}, a, n)));
                },
                autoFocus: !0,
              }),
              r.a.createElement(
                v.a,
                {
                  type: 'submit',
                  fullWidth: !0,
                  variant: 'contained',
                  color: 'primary',
                  className: t.submit,
                  disabled: E,
                },
                'Start game',
              ),
              b && r.a.createElement(S.a, { severity: 'error' }, b),
              E && r.a.createElement(y.a, { variant: 'query' }),
            ),
          );
        },
        R = a(102),
        A = a(220),
        I = a(217),
        L = a(221),
        P = a(222),
        U = a(223),
        J = a(224),
        _ = a(101),
        q = a.n(_),
        F = a(100),
        z = a.n(F),
        M = Object(g.a)(function (e) {
          return {
            root: { display: 'flex', alignItems: 'center' },
            gameContainer: {
              padding: e.spacing(4),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '90vh',
            },
          };
        }),
        V = function (e) {
          var t = e.onStartGame,
            a = e.canStart,
            n = window.location.href;
          return r.a.createElement(
            'div',
            { className: 'flex flex-col items-center space-y-10' },
            r.a.createElement(
              p.a,
              { variant: 'h5' },
              'We are waiting for the players to join',
            ),
            r.a.createElement(
              'p',
              null,
              r.a.createElement('img', {
                src: '/brain-juice/imgs/cat.gif',
                alt: 'Cat gif',
              }),
            ),
            r.a.createElement(
              'p',
              null,
              'You can share this link with your friends to join ',
              r.a.createElement('b', null, n),
            ),
            r.a.createElement(
              'p',
              null,
              r.a.createElement(
                v.a,
                {
                  type: 'button',
                  fullWidth: !0,
                  variant: 'contained',
                  color: 'primary',
                  disabled: a,
                  onClick: t,
                },
                'Start the game',
              ),
            ),
          );
        },
        Y = function () {
          return r.a.createElement('div', null, 'Game has started');
        },
        H = 'player-connected',
        K = 'player-disconnected',
        Q = 'players',
        X = 'join',
        Z = 'game-start',
        $ = z()(T.BASE_URL),
        ee = function () {
          var e = M(),
            t = Object(f.g)().id,
            a = Object(n.useState)(!1),
            c = Object(o.a)(a, 2),
            l = c[0],
            i = c[1],
            m = Object(n.useState)(!1),
            u = Object(o.a)(m, 2),
            s = u[0],
            E = u[1],
            d = Object(n.useState)([]),
            g = Object(o.a)(d, 2),
            b = g[0],
            h = g[1],
            j = Object(n.useState)({}),
            v = Object(o.a)(j, 2),
            O = v[0],
            y = v[1],
            S = Object(n.useState)(''),
            x = Object(o.a)(S, 2),
            w = x[0],
            N = x[1];
          function C() {
            $.emit(Z, O);
          }
          Object(n.useEffect)(
            function () {
              i(!0),
                $.on(Q, function (e) {
                  console.log('Players connected', e), h(e);
                }),
                $.on(H, function (e) {
                  h(function (t) {
                    return [].concat(Object(R.a)(t), [e]);
                  });
                }),
                $.on(K, function (e) {
                  console.log('Player disconnected', e),
                    h(function (t) {
                      return t.filter(function (t) {
                        return t.id !== e.id;
                      });
                    });
                }),
                $.on(Z, function () {
                  console.log('Game has started'), E(!0);
                }),
                (function (e) {
                  return W.get(''.concat('/games', '/').concat(e)).then(
                    function (e) {
                      return e.data;
                    },
                  );
                })(t)
                  .then(function (e) {
                    i(!1), y(e);
                    var t = 'Player ' + new Date().getTime();
                    N(t), $.emit(X, { game: e, player: { name: t } });
                  })
                  .catch(function () {
                    i(!1);
                  });
            },
            [t],
          );
          var k = function () {
            return r.a.createElement(
              A.a,
              { container: !0, spacing: 2 },
              r.a.createElement(
                A.a,
                { item: !0, xs: 3 },
                r.a.createElement(
                  p.a,
                  { variant: 'h5', className: 'p-5' },
                  O.name,
                ),
                r.a.createElement(
                  I.a,
                  null,
                  b.map(function (e) {
                    return r.a.createElement(
                      r.a.Fragment,
                      { key: e.name },
                      r.a.createElement(
                        L.a,
                        { button: !0, disabled: e.name === w },
                        r.a.createElement(
                          P.a,
                          null,
                          r.a.createElement(q.a, null),
                        ),
                        r.a.createElement(U.a, { primary: e.name }),
                      ),
                      r.a.createElement(J.a, null),
                    );
                  }),
                ),
              ),
              r.a.createElement(
                A.a,
                { item: !0, xs: 9, className: e.gameContainer },
                s
                  ? r.a.createElement(Y, null)
                  : r.a.createElement(V, {
                      onStartGame: C,
                      canStart: b.length < 2,
                    }),
              ),
            );
          };
          return r.a.createElement(
            'div',
            { className: e.root },
            l || r.a.createElement(k, null),
          );
        },
        te = Object(g.a)(function (e) {
          return {
            content: { padding: e.spacing(5) },
            item: { textAlign: 'center' },
          };
        });
      var ae = function () {
          var e = te();
          return r.a.createElement(
            C,
            { title: 'Choose an option' },
            r.a.createElement(
              A.a,
              { container: !0, className: e.content },
              r.a.createElement(
                A.a,
                { item: !0, xs: 6, className: e.item },
                r.a.createElement(
                  v.a,
                  {
                    variant: 'contained',
                    color: 'primary',
                    component: s.b,
                    to: '/start',
                  },
                  'Start a game',
                ),
              ),
              r.a.createElement(
                A.a,
                { item: !0, xs: 6, className: e.item },
                r.a.createElement(
                  v.a,
                  {
                    variant: 'contained',
                    color: 'secondary',
                    component: s.b,
                    to: '/enter',
                  },
                  'Enter a game',
                ),
              ),
            ),
          );
        },
        ne = { game: { name: '' }, players: [] },
        re = n.createContext({
          state: ne,
          setState: function (e) {
            return e;
          },
        });
      a(175);
      var ce = function () {
        var e = Object(n.useState)(ne),
          t = Object(o.a)(e, 2),
          a = t[0],
          c = t[1];
        return r.a.createElement(
          s.a,
          null,
          r.a.createElement(
            re.Provider,
            {
              value: {
                setState: function (e) {
                  c(Object(i.a)(Object(i.a)({}, a), e));
                },
                state: a,
              },
            },
            r.a.createElement(m.a, null),
            r.a.createElement(h, null),
            r.a.createElement(
              u.a,
              null,
              r.a.createElement(
                f.c,
                null,
                r.a.createElement(
                  f.a,
                  { path: '/game/:id' },
                  r.a.createElement(ee, null),
                ),
                r.a.createElement(
                  f.a,
                  { path: '/start' },
                  r.a.createElement(D, null),
                ),
                r.a.createElement(
                  f.a,
                  { path: '/' },
                  r.a.createElement(ae, null),
                ),
              ),
            ),
          ),
        );
      };
      l.a.render(
        r.a.createElement(r.a.StrictMode, null, r.a.createElement(ce, null)),
        document.getElementById('root'),
      );
    },
  },
  [[115, 1, 2]],
]);
//# sourceMappingURL=main.f79b3535.chunk.js.map
