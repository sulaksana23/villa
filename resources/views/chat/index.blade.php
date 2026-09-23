<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat &middot; Villa ERP</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css'])
    <style>
        * { margin:0; padding:0; box-sizing:border-box }
        body { background:#09090b; color:#fafafa; font-family:'Inter',sans-serif }
        .msg-bot { background:#1f2937; border-radius:4px 12px 12px 12px; padding:10px 14px; max-width:75%; font-size:13px; line-height:1.5 }
        .msg-admin { background:linear-gradient(135deg,#0ea5e9,#0284c7); border-radius:12px 4px 12px 12px; padding:10px 14px; max-width:75%; font-size:13px; line-height:1.5 }
        .chat-input { border:1px solid #27272a; border-radius:10px; padding:10px 14px; font-size:13px; outline:none; background:#18181b; color:#fafafa; transition:border .2s }
        .chat-input:focus { border-color:#0ea5e9 }
        .session-card { border:1px solid #27272a; border-radius:10px; padding:12px; cursor:pointer; transition:all .2s; background:#18181b }
        .session-card:hover { border-color:#0ea5e9; background:#1f2937 }
        .session-card.active { border-color:#0ea5e9; background:#1f2937 }
        .unread-badge { background:#ef4444; color:#fff; border-radius:50%; width:22px; height:22px; font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0 }
        [x-cloak] { display:none !important }
    </style>
</head>
<body>
    <div style="display:flex;height:100dvh">
        {{-- SIDEBAR --}}
        <div style="width:320px;border-right:1px solid #27272a;display:flex;flex-direction:column;flex-shrink:0">
            <div style="padding:16px;border-bottom:1px solid #27272a">
                <h2 style="font-size:15px;font-weight:700">💬 Live Chat</h2>
                <p style="font-size:11px;color:#a1a1aa;margin-top:2px">Chat dengan pengunjung</p>
            </div>
            <div style="flex:1;overflow-y:auto;padding:8px" x-data="sessionList()" x-init="init()">
                <template x-for="s in sessions" :key="s.session_id">
                    <div class="session-card" :class="{ active: selected === s.session_id }" @click="select(s.session_id)" style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
                        <div style="width:36px;height:36px;border-radius:50%;background:rgba(14,165,233,.15);color:#38bdf8;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;flex-shrink:0" x-text="(s.visitor_name||'G')[0].toUpperCase()"></div>
                        <div style="flex:1;min-width:0">
                            <p style="font-size:13px;font-weight:600" x-text="s.visitor_name || 'Guest'"></p>
                            <p style="font-size:10px;color:#a1a1aa;margin-top:1px" x-text="timeAgo(s.last_message)"></p>
                        </div>
                        <div x-show="parseInt(s.unread) > 0" class="unread-badge" x-text="s.unread"></div>
                    </div>
                </template>
                <div x-show="sessions.length === 0" style="text-align:center;padding:40px 20px;color:#71717a;font-size:13px">
                    Belum ada chat masuk
                </div>
            </div>
        </div>

        {{-- CHAT AREA --}}
        <div style="flex:1;display:flex;flex-direction:column" x-data="adminChat()" x-init="init()">
            {{-- HEADER --}}
            <div style="padding:14px 20px;border-bottom:1px solid #27272a;display:flex;align-items:center;gap:10px">
                <div style="width:38px;height:38px;border-radius:50%;background:rgba(14,165,233,.15);color:#38bdf8;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:15px" x-text="(currentVisitor||'G')[0].toUpperCase()"></div>
                <div>
                    <p style="font-weight:600;font-size:14px" x-text="currentVisitor || 'Pilih chat'"></p>
                    <p style="font-size:11px;color:#22c55e" x-show="currentVisitor">Online</p>
                </div>
                <a href="{{ route('dashboard.index') }}" style="margin-left:auto;color:#a1a1aa;font-size:12px;text-decoration:none;padding:6px 12px;border:1px solid #27272a;border-radius:6px">&larr; Dashboard</a>
            </div>

            {{-- MESSAGES --}}
            <div style="flex:1;overflow-y:auto;padding:16px" x-ref="msgbox">
                <template x-for="m in messages" :key="m.id">
                    <div style="display:flex;margin-bottom:10px" :style="m.is_admin ? 'justify-content:flex-end' : ''">
                        <div class="msg-bot" x-show="!m.is_admin" x-html="m.message"></div>
                        <div class="msg-admin" x-show="m.is_admin" x-html="m.message"></div>
                    </div>
                </template>
                <div x-show="!selected" style="text-align:center;padding:60px 20px;color:#71717a;font-size:13px">
                    Pilih session chat dari sidebar
                </div>
            </div>

            {{-- INPUT --}}
            <div style="padding:12px 16px;border-top:1px solid #27272a;display:flex;gap:8px" x-show="selected">
                <input x-model="input" @keydown.enter="send()" type="text" placeholder="Ketik balasan..." class="chat-input" style="flex:1" x-ref="adminInput" />
                <button @click="send()" style="background:#0ea5e9;color:#fff;border:none;border-radius:10px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:opacity .2s" onmouseover="this.style.opacity='.8'" onmouseout="this.style.opacity='1'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
            </div>
        </div>
    </div>

    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script>
        function sessionList() {
            return {
                sessions: [],
                selected: null,
                interval: null,
                init() {
                    this.load();
                    this.interval = setInterval(() => this.load(), 3000);
                },
                async load() {
                    const r = await fetch('/api/chat/admin/sessions');
                    this.sessions = await r.json();
                },
                select(id) {
                    this.selected = id;
                    window.dispatchEvent(new CustomEvent('select-session', { detail: id }));
                },
                timeAgo(t) {
                    if (!t) return '';
                    const d = new Date(t);
                    const now = new Date();
                    const diff = Math.floor((now - d) / 1000);
                    if (diff < 60) return 'baru saja';
                    if (diff < 3600) return Math.floor(diff/60) + 'm lalu';
                    if (diff < 86400) return Math.floor(diff/3600) + 'j lalu';
                    return d.toLocaleDateString();
                }
            }
        }

        function adminChat() {
            return {
                selected: false,
                messages: [],
                input: '',
                currentVisitor: '',
                interval: null,
                lastId: 0,

                init() {
                    window.addEventListener('select-session', (e) => {
                        this.selected = e.detail;
                        this.loadMessages();
                        if (this.interval) clearInterval(this.interval);
                        this.interval = setInterval(() => this.poll(), 2000);
                    });
                },

                async loadMessages() {
                    const r = await fetch('/api/chat/admin/messages/' + this.selected);
                    const data = await r.json();
                    this.messages = data;
                    this.currentVisitor = data.length > 0 ? data[0].visitor_name : 'Guest';
                    this.lastId = data.length > 0 ? data[data.length-1].id : 0;
                    this.$nextTick(() => this.scrollDown());
                },

                async poll() {
                    if (!this.selected) return;
                    try {
                        const r = await fetch('/api/chat/messages?session_id=' + this.selected + '&since=' + this.lastId);
                        const data = await r.json();
                        if (data.length > 0) {
                            this.messages = this.messages.concat(data);
                            this.lastId = data[data.length-1].id;
                            this.$nextTick(() => this.scrollDown());
                        }
                    } catch(e) {}
                },

                async send() {
                    const text = this.input.trim();
                    if (!text || !this.selected) return;
                    const msg = { session_id: this.selected, message: text, is_admin: true };
                    await fetch('/api/chat/send', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(msg)
                    });
                    this.messages.push({ id: Date.now(), message: text, is_admin: true });
                    this.input = '';
                    this.$nextTick(() => this.scrollDown());
                },

                scrollDown() {
                    const el = this.$refs.msgbox;
                    if (el) el.scrollTop = el.scrollHeight;
                }
            }
        }
    </script>
</body>
</html>
