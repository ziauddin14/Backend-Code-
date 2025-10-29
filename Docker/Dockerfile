FROM node:18-alpine    # Base image set karta hai: Node.js v18 pehle se maujood hai aur "alpine" choti halka image hai taake container size kam rahe.
WORKDIR /app           # Container ke andar working directory /app set karta hai; baad ki commands isi folder mein chalengi.
COPY package*.json ./  # Local package.json aur package-lock.json ko container ke current folder (./) mein copy karta hai taake dependencies install ho saken.
RUN npm install        # Container ke andar npm install chalata hai aur project ki saari dependencies install karta hai.
COPY . .               # Baaqi project files (source code) container mein copy karta hai taake app run ho sake.
EXPOSE 3000            # Bata raha hai ke app port 3000 use karegi (documentation ke liye; run karte waqt port mapping zaroori hoti hai).
CMD ["npm", "start"]   # Jab container start ho to ye default command chalti hai — npm start jo aapki app ko run karega.