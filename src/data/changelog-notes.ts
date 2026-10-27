// The changelog's hand-written notes. Prose, licensed CC BY 4.0 (see REUSE.toml);
// the code that renders it is MPL-2.0 and lives in ./changelog.ts.
//
// Register is Human (brand: support replies, outreach, changelog, blog): "you"
// for the reader, "we" only to own something, contractions, British spelling,
// no em dashes. A release note is one person
// telling another what changed and, where it helps, what was wrong before. It
// is not a PR title with the prefix filed off: the generated notes on GitHub
// already carry those, this page exists because they are unreadable to anyone
// who did not write them.
//
// The full writing rules, with an example, are in CONTENT.md.
import type { Note } from "./changelog";

/**
 * Hand-written notes, keyed by tag. Add a key, write the lines, done.
 *
 * A key that matches no release is surfaced by `ORPHAN_NOTES` in ./changelog.ts
 * and pinned by tests/unit/changelog.test.ts rather than being silently dropped at build
 * time — a typo'd tag would otherwise cost someone their writing with no error
 * anywhere.
 */
export const NOTES: Record<string, Note> = {
  "v1.20752.1037": {
    lines: [
      ["changed", "The Git panel lists Staged Changes and Changes as separate groups in one scroll, conflicts first, each with its own Unstage All or Discard All. Discarding a file under Changes leaves its staged edits alone. A refused commit keeps your message, and a commit can't start during a pull, push or publish."],
      ["fixed", "A commit with nothing staged now says “Nothing staged to commit” instead of “git commit failed”."],
      ["fixed", "The Fork session dialog no longer hides its agent choice the first time you open it; the list fills in when the machine answers."],
      ["changed", "Forks now default to This workspace for every agent, so your uncommitted changes come along. Before, a fork into the same agent defaulted to New workspace."],
      ["new", "File viewers have a Download button. On Android it opens the system Save as screen, with Share beside it; on iPhone it opens the share sheet, where you can save to Files."],
      ["new", "Markdown previews now open links to files on your machine, such as file: URLs, absolute paths and Windows drive paths, instead of refusing them. A file: link that names another computer is still refused, so a link can't send your machine to a network share."],
      ["new", "Remote access lists each connected device's model, and its memory while it's online. Hover over the host chip in the title bar to see the host's memory."],
      ["changed", "Select text, Paste and Copy host clipboard have moved from the terminal's quick actions bar into the session menu."],
      ["fixed", "Clicking in a terminal without selecting anything no longer freezes its output."],
      ["fixed", "A notification from another session now names that session, with the agent's own title moved into the body."],
      ["fixed", "Windows: clicking an Antgrid notification now opens the copy that's already running instead of starting a second one."],
    ],
  },

  "v1.20750.1036": {
    title: "Carry on in another agent",
    lines: [
      ["new", "You can now fork a session into a different agent and carry on with the same context, say when one runs out of quota mid-task. The fork works in the same workspace by default, so your uncommitted edits come along. The new agent reads the old one's transcript from a file in your project that's kept out of git."],
      ["fixed", "A prompt queued while an agent starts up, such as a fork handoff or a message from another session, no longer gets typed into the agent's folder-trust dialog, where it picked whichever option was highlighted. It now waits until you've answered the dialog yourself."],
      ["fixed", "Refreshing a stuck connection, or cancelling one project, no longer leaves other projects open on the same machine disconnected for good. We've also fixed a crash when a machine reconnected while its old connection was still closing."],
      ["fixed", "A single failed read of the scheduler's storage no longer switches scheduled prompts off until you restart the desktop app. Schedules pick up again as soon as the storage can be read."],
      ["fixed", "We read current Codex transcripts again, including ones Codex has compressed after sitting idle, rolled back or compacted. Forks, session names and Handler had been seeing an empty conversation. Undoing a turn in a Codex chat works again too."],
      ["fixed", "We've caught up with recent Claude Code releases. Sessions aren't named after a slash command or a compaction summary, Handler no longer mistakes Claude Code's request logs for the conversation, and an account hold or credential error comes straight to you instead of Handler telling the agent to continue."],
      ["fixed", "Copilot sessions are named from your first prompt instead of staying “Session N”, and OpenCode slash commands that take no arguments run instead of failing."],
      ["new", "The sample project now has a working Scheduler, with example schedules and simulated runs, so you can try it before connecting a machine. Anything you make there is gone when you leave the sample."],
      ["fixed", "Without a machine connected, Scheduler explains what it needs instead of showing an error every five seconds. Errors in Files, Git, Preview and settings now give a readable message instead of a raw exception."],
    ],
  },

  "v1.20746.1035": {
    lines: [
      ["fixed", "We've fixed Windows launches that mangled quoted arguments, failed on paths with spaces or cut an opening prompt short. Prompts that won't fit the Windows command line are sent through the terminal after launch."],
      ["security", "Opening prompts passed through the Windows command shell are now escaped so their punctuation reaches the agent as text instead of running as shell commands."],
      ["changed", "Extra agent arguments on Windows are now treated as arguments. Shell operators, redirections and dynamic variables such as %CD% stay literal; ordinary environment variables still expand."],
      ["new", "We've added conversation resume and native forks for Kimi and Kilo terminal sessions. A Kimi fork into a new workspace uses a transcript handoff instead, because Kimi's native fork keeps the original workspace."],
      ["fixed", "Opening your phone's notification shade or a system dialog no longer resets an otherwise healthy connection when you return."],
      ["fixed", "File attachments keep their original destination while the file picker is open and wait for the connection to recover before uploading. Rebuilding the terminal view during a reconnect no longer discards the pending picker operation."],
      ["new", "Markdown links printed in the terminal can now open a preview of files outside the session's workspace, including plans and reports an agent saves elsewhere."],
    ],
  },

  "v1.20738.1034": {
    lines: [
      ["new", "We've added terminal clipboard sharing. In a remote terminal, you can copy text from the host's clipboard to the device you're using. A setting on that device lets you turn off copies initiated by terminal programs."],
      ["fixed", "Selecting terminal text now holds the view still while output continues, so copying doesn't chase a moving screen. Terminal history has a Copy action on touch screens too."],
      ["new", "We've added one-off prompts alongside recurring schedules for supported agents, while the desktop app is open. The schedule editor shows upcoming runs and gives each chat schedule its own permission mode."],
      ["changed", "With the desktop app open again, recurring schedules now catch up the most recent missed run unless the next is less than fifteen minutes away. Earlier misses are recorded together, and you can choose to skip catch-up instead."],
      ["new", "We've added Clear site data to the browser preview. The app also clears supported preview data when a port changes project and when you sign out. Clearing affects all previews and signs you out of their dev apps; older Android WebViews retain some data."],
      ["fixed", "Relative file links from terminals, including OpenCode's, now open in the Files tab instead of being refused as non-web links. A line number in the link takes you to that line."],
      ["changed", "We've made phone controls easier to tap, added pinch and wheel zoom to image previews, and made long lines and wide tables easier to find with visible scrollbars."],
      ["fixed", "Undelivered push notifications now expire after twelve hours, so a phone coming back after days offline doesn't receive a backlog of old agent updates."],
      ["changed", "We've made the built-in sample project clearer about when you need to connect your own computer. You can open support chat from the sample without signing in."],
    ],
  },

  "v1.20732.1032": {
    lines: [
      ["new", "We've added scheduled prompts for supported agents while the desktop app is open. You can manage schedules from connected devices, review each run and open its session when it needs your input."],
      ["fixed", "Resending a sign-in link no longer loses the new attempt when an expiry response for the old link arrives during the resend. We also show the server's resend cooldown."],
      ["new", "The site has a public roadmap, so you can see what we're building and what's still under consideration."],
    ],
  },
  "v1.20731.1031": {
    lines: [
      ["new", "Help lives in the main menu now, with support, logs, version information and a way to check for updates yourself."],
      ["changed", "The app does less work while you type, while an agent streams a reply and while files change. Long conversations, search results and terminal scrollback no longer make every small update reprocess everything already on screen."],
      ["fixed", "Moving the mouse over an agent terminal no longer floods it with motion reports. We cap those reports at twenty a second."],
      ["fixed", "A temporary connection failure no longer leaves your phone stuck on a permanent refusal. You can also share its log files from the app when something goes wrong."],
      ["changed", "The web sign-in page remembers which method you last used, so coming back doesn't mean guessing which button got you in."],
    ],
  },
  "v1.20729.1030": {
    lines: [
      ["new", "File paths and bare web addresses printed in the terminal are clickable. A file opens at the line the agent named, a folder is revealed in the tree, and relative paths resolve from that terminal's working directory. They keep the terminal's colours and underline on hover."],
      ["changed", "The Git panel has an inline commit box, so writing a commit stays beside the changes you're reviewing."],
      ["fixed", "Old git results and workspace notices no longer announce themselves again when you open a session or switch focus. Errors and agent notifications also reach you while the New Session screen is open."],
      ["fixed", "Session status no longer gets stuck needing you after an abandoned prompt or a local slash command. OpenCode's permissions and questions reach Antgrid again, and a question still waiting for an answer keeps its status."],
      ["fixed", "Windows packages declare the firewall rules the bridge needs for remote connections."],
      ["fixed", "Android notifications use a monochrome Antgrid icon rather than a solid block."],
    ],
  },
  "v1.20727.1029": {
    title: "A steadier remote connection",
    lines: [
      ["changed", "Remote terminal, file and preview traffic now travels over native Iroh streams. The connection between your authorised devices provides the encryption; the central WebSocket carries account and connection control only. Update the app and bridge together for this change."],
      ["changed", "The browser preview forwards the dev server's traffic without rewriting HTTP headers or cookies. It supports local HTTPS too, and keeps its address through a reconnect."],
      ["new", "The phone terminal has a key bar with sticky Ctrl and Alt, a one-tap Ctrl+C and a prompt box for composing before you send. Long-press the keyboard key when you need to type directly into the terminal."],
      ["new", "You can sign in with Apple on the web, on iOS and through the browser on macOS. Other iOS sign-in flows stay inside the app."],
      ["fixed", "Returning to a session on your phone catches the conversation up with what happened while you were away."],
      ["fixed", "Bringing the desktop window into focus no longer drops connected phones, and renewing account tokens no longer knocks an otherwise valid connection offline."],
      ["security", "The remote-access switch is enforced across remote commands, agent exchanges and preview connections. Revoking a device from your account is also handled when no project is open."],
      ["fixed", "Remote-access controls recover after the bridge starts, and launching the app no longer flashes a false request to restart the bridge while it's still warming up."],
      ["fixed", "Session status follows the agent's work more reliably instead of staying busy after a turn has ended."],
      ["changed", "App notices stack at the bottom of the window, with repeated notices replacing themselves. Following a local link opens the right preview tab even when the preview isn't on screen."],
    ],
  },
  "v1.20719.1027": {
    lines: [
      ["fixed", "Signing in on macOS survives an app restart. The notarised app can now use the keychain where it stores your credentials."],
      ["fixed", "Agent terminals consistently advertise colour support, including on Windows."],
    ],
  },
  "v1.20719.1026": {
    lines: [
      ["new", "The site and your web account have a light theme. They follow your system setting, with a switch when you'd rather choose yourself."],
      ["fixed", "An agent turn inferred from terminal activity no longer stays open forever when its end wasn't reported."],
    ],
  },
  "v1.20717.1025": {
    lines: [
      ["fixed", "Remote connections recover more reliably after a redial, without losing frames during the handover, and detect a dead connection sooner."],
      ["fixed", "A bridge that started in local mode can answer an exchange from another agent after it connects remotely."],
    ],
  },
  "v1.20716.1024": {
    lines: [
      ["changed", "The file tree loads folders as you expand them instead of fetching the whole repository. Large projects have less to send before you can start browsing."],
      ["new", "The tree shows git-ignored files too. Collapse and reopen a folder to refresh them; file search and agent mentions still leave ignored files out."],
    ],
  },
  "v1.20715.1023": {
    lines: [
      ["fixed", "Exchanges between agents deliver their replies more reliably and report refusals instead of leaving the sender waiting."],
      ["security", "Incoming agent exchanges respect the machine's remote-access switch."],
      ["fixed", "Narrowing a terminal pane no longer leaves the agent's full-screen display at its old width."],
    ],
  },
  "v1.20714.1022": {
    lines: [
      ["changed", "Handler's backlog is much easier to read. Items are numbered rather than labelled with a status word most of them share, so a dependency can point at the one it's waiting on, and the sheet no longer says your sentence twice in two voices."],
      ["changed", "The bar above the prompt says what Handler is actually doing, and the lens row is legible."],
      ["fixed", "Switching sessions no longer resizes the agent terminal in front of you. It used to open at the previous session's width and correct itself a frame later. Pane dividers belong to their session too, so dragging one doesn't move it everywhere else."],
      ["new", "The site has a blog, for the things that need more room than a release note."],
    ],
  },
  "v1.20713.1021": {
    lines: [
      ["changed", "Antgrid's source is MPL-2.0. The relay and the web service stay Elastic 2.0; everything else, including the wire format and the Dart relay client, is MPL now."],
      ["fixed", "Remote sessions were timing out with nothing on the wire to explain it. A frame the checkout gate refused was dropped in silence, so the app waited for an answer that was never coming. Every refusal is answered now."],
      ["fixed", "A burst of output that outran the terminal used to cost you the display for the rest of the run. It costs you the burst instead, and the app tells you what it dropped."],
      ["fixed", "Handler was judging on far less than it thought. It asks for twenty messages of context and was usually getting one. It reads a wide enough window now, and the activity pane shows the history from before you opened it."],
      ["new", "You can write your own lens when you arm Handler instead of picking one of ours."],
      ["security", "The remote-access switch is inbound only, which is what its name and its own wording have always promised. It governs what can be done to this machine, so with it off your agents here can still open an exchange with another machine and get a reply. Nothing unsolicited gets in."],
      ["fixed", "Switching sessions while a side pane is moving no longer hard-wraps the agent's output."],
    ],
  },
  "v1.20711.1020": {
    lines: [
      ["changed", "Support for each coding agent moved into a package of its own. Nothing changes about the agents we ship; it's the groundwork for adding one without touching the bridge."],
    ],
  },
  "v1.20710.1017": {
    title: "The terminal, over a remote link",
    lines: [
      ["changed", "The terminal works differently at a distance. Rather than streaming every byte to your phone, the bridge keeps the real screen and sends pictures of it, up to twenty a second. Scrollback stays on the machine and pages in as you scroll."],
      ["changed", "It's a coordinated change with no fallback, so an app or a bridge too old to speak it asks to be updated rather than half working."],
    ],
  },
  "v1.20710.1016": {
    lines: [
      ["new", "There's live chat on the site, in your account and in the app. Nothing is requested from the chat provider until you click the launcher, so it costs nothing on a page you never chat from."],
      ["fixed", "We were pushing terminal output at apps with nothing listening for it, indefinitely. One link measured 17,000 dropped frames in 24 minutes. It stops when the listener goes."],
      ["changed", "Analytics moved to an Umami instance we host ourselves. It's cookieless and first-party, and the privacy notice says so."],
    ],
  },
  "v1.20706.1015": {
    lines: [
      ["new", "Modelwatch. The bridge spawns model calls on your own provider account to name sessions and to run Handler's judge, and until now they were invisible: they spent your money and left no record of what ran or on which model. Now there's a record of every one."],
      ["security", "Signing out signs you out. Account state was surviving in a cache for the life of the process, and a machine that had left the account was still listed."],
      ["changed", "Windows opens relay frames with the operating system's own AES-GCM. The pure Dart cipher it fell back to ran at around 12 MB/s on the UI thread, which a busy terminal or a tunnelled preview paid for directly."],
      ["fixed", "An isolated Codex session could refuse to open, printing “Resuming session…” and exiting a couple of seconds later. It was trying to resume a helper thread that was never a session."],
      ["fixed", "On Windows a session action could fail outright because a virus scanner or the search indexer had one of our files open for a moment. We wait it out."],
      ["new", "And this page."],
    ],
  },
  "v1.20705.1014": {
    lines: [
      ["fixed", "Opening a remote session could land you on a frozen agent terminal with nothing saying why. The pane couldn't tell “there are no terminals” from “the terminals haven't attached yet”, and some of the waits had nothing behind them that could ever end."],
      ["fixed", "We were pushing megabytes of file tree at connected apps. A 224 second capture against one remote session measured 4.6 MB, more than half of it tree snapshots. That's bounded now, and the app can report a stall of its own rather than leaving it visible only from the other end."],
      ["fixed", "Fixed a Windows bug that could leave Ctrl stuck down after a paste."],
      ["fixed", "Image previews open where they were opened from, and a narrow pane stops overflowing."],
    ],
  },
  "v1.20705.1013": {
    lines: [
      ["fixed", "An opened folder resolves to the project that owns it, so one repository can't appear twice under two identities."],
      ["changed", "File tree state is pulled by the app when it wants it instead of being pushed at it on every reconnect."],
    ],
  },
  "v1.20704.1012": {
    lines: [
      ["fixed", "Remote sessions were timing out on large repositories. We sent the whole file tree the moment you connected, which swamped the link before anything else could get through. The tree is paced now and the preview tunnel streams."],
      ["fixed", "Resuming a session keeps what it had, and Codex approval alerts don't fire before the agent has actually asked for anything."],
      ["fixed", "Fixed a file tree bug where the selection could point at the wrong row after a refresh."],
      ["changed", "Tidied up the annotation panel in the browser preview."],
    ],
  },
  "v1.20702.1011": {
    lines: [
      ["new", "Downloads have a page of their own now. It also stopped handing a Windows installer to anyone reading on a phone."],
      ["changed", "We stopped polling git for sessions nobody is watching."],
    ],
  },
  "v1.20700.1010": {
    lines: [
      ["new", "Tapping a push notification opens the session it's about."],
      ["fixed", "Live reload works in the browser preview again. We weren't forwarding the HMR subprotocol, so the socket never came up."],
    ],
  },
  "v1.20699.1009": {
    title: "Handler grows up",
    lines: [
      ["changed", "Handler belongs to the session now rather than the machine, and when it refuses to arm it tells you why."],
      ["changed", "It asks the agent before answering on your behalf, and it confirms any undo that would leave your machine."],
      ["changed", "Notify-only is retired. Handler acts, and the wrap-up it writes survives a restart."],
      ["new", "Markdown files open in a real viewer, with a heading outline and links that go where they say."],
      ["new", "The git panel gained commit history, pull and push."],
    ],
  },
  "v1.20697.1006": {
    lines: [
      ["fixed", "The relay's heartbeat and recovery are harder to knock over."],
      ["changed", "Handler's backlog dialog is easier to work with."],
    ],
  },
  "v1.20696.1005": {
    lines: [
      ["new", "Approval policy is set per session, so you can let one session skip prompts without touching the others."],
      ["changed", "Workspace context is scoped to the session it belongs to."],
    ],
  },
  "v1.20695.1004": {
    lines: [
      ["new", "Point at anything in the browser preview and draw on it to leave the agent feedback."],
      ["fixed", "Isolated sessions were becoming permanently undeletable. A coding agent's helpers outlive the terminal that started them and keep hold of the checkout, so git couldn't remove it. A terminal takes its orphans with it now."],
      ["fixed", "Coding agents get to shut down properly. Every teardown path killed an agent's terminal outright, which is why Claude Code kept announcing that its renderer hadn't finished starting last time."],
      ["fixed", "Coming back to a session shows you the screen as it stands rather than the tail of a stream you missed the start of. Files and preview recover the same way."],
      ["fixed", "A session keeps the title we generated for it across a restart."],
    ],
  },
  "v1.20693.1003": {
    lines: [
      ["fixed", "Push notifications work on Android. They never had: the Firebase config the build needs was ignored by git and had never shipped."],
      ["new", "Fork a session, into a workspace cut from where it got to or into the one it's already using, and carry the conversation over."],
      ["new", "Two-finger scroll works in the terminal on a laptop trackpad."],
      ["fixed", "Handler reports what it couldn't send instead of calling the work done. Traced from a real session where it sat armed all morning, sent the agent nothing, and wrote a wrap-up anyway."],
      ["fixed", "Pressing left twice at a Claude prompt hands the conversation to Claude's own background supervisor and takes the terminal with it. We don't follow it there."],
      ["fixed", "Updating on Windows brings the app back afterwards, shuts the bridge down rather than having it killed mid-install, and reports what the Store actually did instead of calling every outcome a success."],
    ],
  },
  "v1.20692.1002": {
    lines: [
      ["changed", "Sessions are named for what they're about rather than for the first thing you typed."],
      ["fixed", "Tapping a remote session opens that session, not whichever one the cache happened to list first."],
      ["fixed", "Links in the terminal open on a plain click. A full-screen agent takes the mouse before it prints anything, which is why they didn't."],
      ["security", "You can see where a link goes before you follow it, and we ask first when the address is built to be misread."],
      ["fixed", "The projects drawer indents. Every level used to start at the same place, so a three-level tree rendered flat."],
    ],
  },
};
