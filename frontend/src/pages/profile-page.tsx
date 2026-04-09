import * as React from 'react';
import { ArrowLeft, Calendar, Heart, MessageCircle, User } from 'lucide-react';

import { PageShell } from '@/components/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiFetch, formatDate, type Post } from '@/lib/api';
import { getUser } from '@/lib/auth';

// 用户公开资料类型
type PublicUser = {
	id: number;
	username: string;
	avatar_url?: string | null;
	role?: string;
	age?: number | null;
	gender?: string | null;
	birthday?: string | null;
	attribute?: string | null;
	is_nanliang?: boolean;
	bio?: string | null;
	bg_image?: string | null;
	created_at?: string | null;
};

type UserComment = {
	id: number;
	post_id: number;
	post_title: string;
	content: string;
	created_at: string;
};

type ProfileData = {
	user: PublicUser;
	posts: Post[];
	posts_total: number;
	comments: UserComment[];
	comments_total: number;
};

const GENDER_MAP: Record<string, string> = {
	male: '男',
	female: '女',
	other: '其他',
};

const ATTRIBUTE_MAP: Record<string, string> = {
	s: 'S',
	m: 'M',
};

function getUserIdFromPath(): string | null {
	const params = new URLSearchParams(window.location.search);
	const q = params.get('id') || params.get('user_id');
	if (q && /^\d+$/.test(q)) return q;
	const m = window.location.pathname.match(/^\/profile\/(\d+)$/);
	return m ? m[1] : null;
}

export function ProfilePage() {
	const currentUser = React.useMemo(() => getUser(), []);
	const [data, setData] = React.useState<ProfileData | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState('');

	const [postOffset, setPostOffset] = React.useState(0);
	const [commentOffset, setCommentOffset] = React.useState(0);
	const PAGE_SIZE = 10;

	const userId = getUserIdFromPath();

	React.useEffect(() => {
		if (!userId) {
			setError('无效的用户 ID');
			setLoading(false);
			return;
		}
		loadProfile(0, 0);
	}, [userId]);

	async function loadProfile(pOffset: number, cOffset: number) {
		if (!userId) return;
		setLoading(true);
		setError('');
		try {
			const result = await apiFetch<ProfileData>(
				`/user/${userId}/profile?post_limit=${PAGE_SIZE}&post_offset=${pOffset}&comment_offset=${cOffset}`
			);
			setData(result);
			setPostOffset(pOffset);
			setCommentOffset(cOffset);
		} catch (e: any) {
			setError(String(e?.message || e));
		} finally {
			setLoading(false);
		}
	}

	if (loading && !data) {
		return (
			<PageShell>
				<div className="flex items-center justify-center py-20 text-muted-foreground">加载中...</div>
			</PageShell>
		);
	}

	if (error && !data) {
		return (
			<PageShell>
				<div className="space-y-4">
					<Button variant="outline" size="sm" onClick={() => history.back()}>
						<ArrowLeft className="mr-1 h-4 w-4" /> 返回
					</Button>
					<div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-destructive">{error}</div>
				</div>
			</PageShell>
		);
	}

	const profile = data?.user;

	return (
		<PageShell>
			<div className="space-y-6">
				{/* 返回按钮 */}
				<Button variant="outline" size="sm" onClick={() => history.back()}>
					<ArrowLeft className="mr-1 h-4 w-4" /> 返回
				</Button>

				{/* 个人资料卡片 */}
				<div className="relative rounded-2xl overflow-hidden border border-sakura/20 shadow-anime bg-background">
					{/* 背景图 */}
					<div
						className="h-40 sm:h-56 w-full bg-gradient-to-br from-sakura/30 via-lavender/20 to-sky/20"
						style={
							profile?.bg_image
								? { backgroundImage: `url(${profile.bg_image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
								: {}
						}
					/>

					{/* 用户信息区 */}
					<div className="px-5 pb-5">
						{/* 头像 */}
						<div className="flex items-end justify-between -mt-10 mb-3">
							<div className="relative">
								{profile?.avatar_url ? (
									<img
										src={profile.avatar_url}
										alt={profile.username}
										className="h-20 w-20 rounded-full border-4 border-background object-cover shadow-lg"
									/>
								) : (
									<div className="h-20 w-20 rounded-full border-4 border-background bg-gradient-to-br from-sakura/40 to-lavender/40 flex items-center justify-center shadow-lg">
										<User className="h-9 w-9 text-primary/60" />
									</div>
								)}
								{profile?.role === 'admin' && (
									<span className="absolute -bottom-1 -right-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow">管理员</span>
								)}
							</div>
							{/* 如果是自己，显示编辑按钮 */}
							{currentUser && profile && currentUser.id === profile.id && (
								<Button size="sm" variant="outline" onClick={() => (window.location.href = '/settings')}>
									编辑资料
								</Button>
							)}
						</div>

						{/* 用户名和标签 */}
						<div className="space-y-2">
							<div className="flex flex-wrap items-center gap-2">
								<h1 className="text-xl font-bold font-display">{profile?.username}</h1>
								{profile?.is_nanliang && (
									<span className="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 px-2 py-0.5 rounded-full border border-pink-200 dark:border-pink-700">
										🌸 南梁
									</span>
								)}
								{profile?.attribute && (
									<span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-700">
										{ATTRIBUTE_MAP[profile.attribute] || profile.attribute}
									</span>
								)}
							</div>

							{/* 基本信息标签行 */}
							<div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
								{profile?.gender && (
									<span className="flex items-center gap-1">
										<span>👤</span> {GENDER_MAP[profile.gender] || profile.gender}
									</span>
								)}
								{profile?.age != null && (
									<span className="flex items-center gap-1">
										<span>🎂</span> {profile.age} 岁
									</span>
								)}
								{profile?.birthday && (
									<span className="flex items-center gap-1">
										<Calendar className="h-3.5 w-3.5" /> {profile.birthday}
									</span>
								)}
								{profile?.created_at && (
									<span className="flex items-center gap-1">
										<span>📅</span> 注册于 {formatDate(profile.created_at)}
									</span>
								)}
							</div>

							{/* 个人介绍 */}
							{profile?.bio && (
								<p className="text-sm text-foreground/80 leading-relaxed mt-2 whitespace-pre-wrap">{profile.bio}</p>
							)}
						</div>
					</div>
				</div>

				{/* 帖子和回复两栏 */}
				<div className="grid gap-6 lg:grid-cols-2">
					{/* 帖子列表 */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base flex items-center gap-2">
								<MessageCircle className="h-4 w-4 text-primary" />
								发布的帖子
								{data && <span className="text-xs text-muted-foreground font-normal">共 {data.posts_total} 篇</span>}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 p-4 pt-0">
							{loading ? (
								<div className="text-center py-6 text-muted-foreground text-sm">加载中...</div>
							) : data?.posts.length === 0 ? (
								<div className="text-center py-6 text-muted-foreground text-sm">暂无帖子</div>
							) : (
								data?.posts.map((post) => (
									<a
										key={post.id}
										href={`/post?id=${post.id}`}
										className="block rounded-xl border border-border/60 bg-muted/30 hover:bg-sakura/5 hover:border-sakura/30 transition-all p-3 group"
									>
										<div className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2 leading-snug">
											{post.title}
										</div>
										<div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
											<span>{formatDate(post.created_at)}</span>
											{post.like_count != null && (
												<span className="flex items-center gap-0.5">
													<Heart className="h-3 w-3" /> {post.like_count}
												</span>
											)}
											{post.comment_count != null && (
												<span className="flex items-center gap-0.5">
													<MessageCircle className="h-3 w-3" /> {post.comment_count}
												</span>
											)}
										</div>
									</a>
								))
							)}

							{/* 帖子分页 */}
							{data && data.posts_total > PAGE_SIZE && (
								<div className="flex items-center justify-between pt-2">
									<Button
										size="sm"
										variant="outline"
										disabled={postOffset === 0 || loading}
										onClick={() => loadProfile(Math.max(0, postOffset - PAGE_SIZE), commentOffset)}
									>
										上一页
									</Button>
									<span className="text-xs text-muted-foreground">
										{Math.floor(postOffset / PAGE_SIZE) + 1} / {Math.ceil(data.posts_total / PAGE_SIZE)}
									</span>
									<Button
										size="sm"
										variant="outline"
										disabled={postOffset + PAGE_SIZE >= data.posts_total || loading}
										onClick={() => loadProfile(postOffset + PAGE_SIZE, commentOffset)}
									>
										下一页
									</Button>
								</div>
							)}
						</CardContent>
					</Card>

					{/* 回复列表 */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base flex items-center gap-2">
								<Heart className="h-4 w-4 text-primary" />
								发布的回复
								{data && <span className="text-xs text-muted-foreground font-normal">共 {data.comments_total} 条</span>}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 p-4 pt-0">
							{loading ? (
								<div className="text-center py-6 text-muted-foreground text-sm">加载中...</div>
							) : data?.comments.length === 0 ? (
								<div className="text-center py-6 text-muted-foreground text-sm">暂无回复</div>
							) : (
								data?.comments.map((comment) => (
									<a
										key={comment.id}
										href={`/post?id=${comment.post_id}`}
										className="block rounded-xl border border-border/60 bg-muted/30 hover:bg-sakura/5 hover:border-sakura/30 transition-all p-3 group"
									>
										<div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
											<MessageCircle className="h-3 w-3" />
											<span className="line-clamp-1 group-hover:text-primary transition-colors">{comment.post_title}</span>
										</div>
										<p className="text-sm text-foreground/80 line-clamp-2 leading-snug">{comment.content}</p>
										<div className="mt-1.5 text-xs text-muted-foreground">{formatDate(comment.created_at)}</div>
									</a>
								))
							)}

							{/* 回复分页 */}
							{data && data.comments_total > PAGE_SIZE && (
								<div className="flex items-center justify-between pt-2">
									<Button
										size="sm"
										variant="outline"
										disabled={commentOffset === 0 || loading}
										onClick={() => loadProfile(postOffset, Math.max(0, commentOffset - PAGE_SIZE))}
									>
										上一页
									</Button>
									<span className="text-xs text-muted-foreground">
										{Math.floor(commentOffset / PAGE_SIZE) + 1} / {Math.ceil(data.comments_total / PAGE_SIZE)}
									</span>
									<Button
										size="sm"
										variant="outline"
										disabled={commentOffset + PAGE_SIZE >= data.comments_total || loading}
										onClick={() => loadProfile(postOffset, commentOffset + PAGE_SIZE)}
									>
										下一页
									</Button>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</PageShell>
	);
}
