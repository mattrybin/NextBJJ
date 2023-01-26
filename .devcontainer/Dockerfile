FROM node:19-slim

RUN apt-get update && apt-get -y install procps git curl libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev
RUN curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;
RUN pnpm install-completion bash;
RUN apt-get -y install zsh gron jq vim;
RUN chsh -s $(which zsh);
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)";
RUN npx playwright install
RUN npx playwright install-deps
RUN curl -sS https://webi.sh/shfmt | sh
RUN cd && curl https://raw.githubusercontent.com/mattrybin/dotfiles/master/.alias > .alias;
RUN cd && curl https://raw.githubusercontent.com/mattrybin/dotfiles/master/.zshrc > .zshrc;
RUN cd && echo "alias save=\"git add . && git commit -m 'save'\"" >> .alias;
RUN cd && echo "alias push=\"git add . && git commit -m 'save' --quiet && git push\"" >> .alias;
RUN cd && echo "alias clean=\"git clean -Xdf\"" >> .alias;
RUN cd && echo "alias install=\"pnpm install\"" >> .alias;

# Speed up git
RUN git config --global http.postBuffer 2048M
RUN git config --global http.maxRequestBuffer 1024M
RUN git config --global core.compression 9
RUN git config --global ssh.postBuffer 2048M
RUN git config --global ssh.maxRequestBuffer 1024M
RUN git config --global pack.windowMemory 256m 
RUN git config --global pack.packSizeLimit 256m
