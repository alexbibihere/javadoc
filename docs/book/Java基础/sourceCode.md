---
icon: pen-to-square
date: 2022-01-01
category:
  - Java基础
tag:
  - red
  - big
  - round
---
# java 基础必读源码
## Object
getClass()返回对象的运行时类的 Class 对象,可以用于反射操作。
//`native`修饰的方法，调用系统方法，通常由C++或C语言实现
public final native Class<?> getClass();
hashCode()返回对象的哈希码，用于在哈希表中定位对象
@HotSpotIntrinsicCandidate
public native int hashCode();
equals()比较两个对象的相等性。默认实现比较两个对象的内存地址
public boolean equals(Object obj) {
    return (this == obj);
}
clone()创建并返回当前对象的一个副本,必须实现 Cloneable 接口.
protected native Object clone() throws CloneNotSupportedException;
toString()返回对象的字符串表示，默认实现为类名加哈希码
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
notify()唤醒在此对象监视器上等待的单个线程,用于多线程编程。
@HotSpotIntrinsicCandidate
public final native void notify();
notifyAll()唤醒在此对象监视器上等待的所有线程，用于多线程编程。
wait()使当前线程在此对象监视器上等待，直到其他线程调用 notify() 或 notifyAll()。有多个重载版本，可以指定等待的时间。
@HotSpotIntrinsicCandidate
public final native void notifyAll();
finalize()当对象的引用不再被使用且被垃圾回收器标记为可回收时，finalize() 方法会被调用,从 JDK 9 开始，finalize() 方法不推荐使用。
protected void finalize() throws Throwable { }
## Integer
内部类IntegerCache，缓存范围 -128 到127 ，最大值可配置
private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static final Integer cache[];

    static {
        // high value may be configured by property
        int h = 127;
        String integerCacheHighPropValue =
            VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        if (integerCacheHighPropValue != null) {
            try {
                int i = parseInt(integerCacheHighPropValue);
                i = Math.max(i, 127);
                // Maximum array size is Integer.MAX_VALUE
                h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
            } catch( NumberFormatException nfe) {
                // If the property cannot be parsed into an int, ignore it.
            }
        }
        high = h;

        cache = new Integer[(high - low) + 1];
        int j = low;
        for(int k = 0; k < cache.length; k++)
            cache[k] = new Integer(j++);

        // range [-128, 127] must be interned (JLS7 5.1.7)
        assert IntegerCache.high >= 127;
    }

    private IntegerCache() {}
}
valueOf 方法,整数在缓存范围中直接返回缓存的Integer
@HotSpotIntrinsicCandidate
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}
## String
类用final修饰、value值是1.8版本及以前是char[]数组，1.9之后是byte[]也是用final进行修饰
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {

    /**
     * 存储字符的字节
     */
    @Stable
    private final byte[] value;
    //字符编码
    private final byte coder;

    /** Cache the hash code for the string */
    private int hash; // Default to 0
## HashMap
1. HashMap 的基本结构
HashMap 的主要数据结构是数组和链表（或红黑树）：

Node[] table: 存储哈希表的数组，每个元素是一个链表或红黑树的头节点。
int size: 当前映射中键值对的数量。
int threshold: 用于控制扩容的阈值。当 size 超过 threshold = (capacity * load factor)时，HashMap 会进行扩容，通常是原来的两倍。
float loadFactor: 负载因子，表示哈希表的满载程度，默认值为 0.75。

transient Node<K,V>[] table;


transient Set<Map.Entry<K,V>> entrySet;


transient int size;

transient int modCount;

/**
 * The next size value at which to resize (capacity * load factor).
 *
 * @serial
 */
int threshold;

final float loadFactor;
//节点链表
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
    
    Node(int hash, K key, V value, Node<K,V> next) {
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = next;
    }
    ..............
}

//树结果
static final class TreeNode<K,V> extends LinkedHashMap.Entry<K,V> {
    TreeNode<K,V> parent;  // red-black tree links
    TreeNode<K,V> left;
    TreeNode<K,V> right;
    TreeNode<K,V> prev;    // needed to unlink next upon deletion
    boolean red;
    TreeNode(int hash, K key, V val, Node<K,V> next) {
        super(hash, key, val, next);
    }

    /**
     * Returns root of tree containing this node.
     */
    final TreeNode<K,V> root() {
        for (TreeNode<K,V> r = this, p;;) {
            if ((p = r.parent) == null)
                return r;
            r = p;
        }
    }
 .........
2. 构造函数
HashMap 提供了多个构造函数，可以自定义初始容量和负载因子：

public HashMap(int initialCapacity, float loadFactor) {
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal initial capacity: " + initialCapacity);
    if (loadFactor <= 0 || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal load factor: " + loadFactor);
    this.loadFactor = loadFactor;
    this.threshold = tableSizeFor(initialCapacity);
}
3 tableSizeFor 方法
该方法用于计算最接近 initialCapacity 的 2 的幂次方，以保证 HashMap 的性能。这样做的目的是为了减少哈希冲突。

static final int tableSizeFor(int cap) {
    int n = -1 >>> Integer.numberOfLeadingZeros(cap - 1);
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
4. 哈希函数
HashMap 使用哈希函数来计算键的哈希值，并将其映射到数组的索引。以下是哈希函数的实现：

static final int hash(int h) {
    return h ^ (h >>> 16);
}
这个哈希函数通过位运算来混合高位和低位的哈希值，从而降低哈希碰撞的概率。

5. 添加元素
HashMap 的核心操作之一是添加元素，主要通过 put 方法实现：

public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}

final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;

    // 如果数组为空，则进行初始化
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;

    // 计算索引
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    else {
        Node<K,V> e; K k;
        if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))
            e = p; // 找到键值对
        else if (p instanceof TreeNode)
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value); // 红黑树处理
        else {
            for (int binCount = 0; ; ++binCount) {
                if ((e = p.next) == null) {
                    p.next = newNode(hash, key, value, null);
                    if (binCount >= TREEIFY_THRESHOLD - 1) // 检查是否需要转化为红黑树
                        treeifyBin(tab, hash);
                    break;
                }
                if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                p = e;
            }
        }
        if (e != null) { // 更新值
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            return oldValue;
        }
    }
    
    // 增加大小并检查是否需要扩容
    if (++size > threshold)
        resize();
    return null;
}
6. 扩容
当 size 超过 threshold 时，HashMap 会自动进行扩容，通常是将数组长度翻倍，将旧数组中的所有元素重新计算哈希值，并将它们放入新的数组中。这是因为哈希表的索引是基于数组的长度计算的，当数组长度改变时，哈希值的索引也会改变。扩容过程通过 resize() 方法实现：

//伪代码
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCapacity = (oldTab == null) ? 0 : oldTab.length;
    int newCapacity = oldCapacity << 1; // 新容量是旧容量的两倍
    Node<K,V>[] newTab = new Node[newCapacity];

    // 将旧数组中的元素重新哈希并放入新数组
    for (int j = 0; j < oldCapacity; j++) {
        Node<K,V> e = oldTab[j];
        if (e != null) {
            oldTab[j] = null; // 释放旧数组的引用
            do {
                Node<K,V> next = e.next;
                int i = (newCapacity - 1) & e.hash; // 计算新索引
                e.next = newTab[i]; // 将元素放入新数组
                newTab[i] = e;
                e = next;
            } while (e != null);
        }
    }
    table = newTab; // 更新 table 引用
    threshold = (int)(newCapacity * loadFactor); // 更新阈值
}
7. 查找元素
查找元素主要通过 get 方法实现：

public V get(Object key) {
    Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

final Node<K,V> getNode(int hash, Object key) {
    Node<K,V>[] tab; Node<K,V> e; int n; K k;

    if ((tab = table) != null && (n = tab.length) > 0) {
        if ((e = tab[(n - 1) & hash]) != null) {
            if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
                return e; // 找到
            if (e instanceof TreeNode)
                return ((TreeNode<K,V>)e).getTreeNode(hash, key); // 红黑树查找
            while (e != null) {
                if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
                    return e;
                e = e.next; // 遍历链表
            }
        }
    }
    return null;
}
8. 删除元素
删除元素通过 remove 方法实现，过程与查找类似：

public V remove(Object key) {
    Node<K,V> e;
    return (e = removeNode(hash(key), key)) == null ? null : e.value;
}

final Node<K,V> removeNode(int hash, Object key) {
    // 查找并删除节点的逻辑
}
## ArrayList
底层维护一个动态数组，初始默认容量10，通常每次扩容后的大小为原来的1.5倍
public class ArrayList<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, Serializable {
    private transient Object[] elementData; // 存储元素的数组
    private int size; // 当前元素数量

    // 默认初始化容量
    private static final int DEFAULT_CAPACITY = 10;
}

//扩容
private void grow(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    //1.5倍
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity);
}

## HashSet
底层维护的HashMap，元素维护在HashMap的key中

private transient HashMap<E,Object> map; // 底层使用 HashMap 存储元素
private static final Object PRESENT = new Object(); // 存储的值

//构造器
public HashSet() {
    map = new HashMap<>();
}

// t添加的元素作为Map的key，值为 new Object
public boolean add(E e) {
    return map.put(e, PRESENT)==null;
}

## Collections
常用API

sort(List<T> list)对指定的列表进行升序排序。
binarySearch(List<? extends Comparable<? super T>> list, T key)使用二分查找法在已排序的列表中查找指定元素，返回其索引。
synchronizedList(List<T> list)将List转为线程安全的list,map等集合结构都有对应的API。 核心原理对集合进行二次封装，将集合的修改查询加synchronized修饰
static class SynchronizedList<E>
   extends SynchronizedCollection<E>
   implements List<E> {
   private static final long serialVersionUID = -7754090372962971524L;

   final List<E> list;

   SynchronizedList(List<E> list) {
       super(list);
       this.list = list;
   }
   .............

   public E get(int index) {
       synchronized (mutex) {return list.get(index);}
   }
   public E set(int index, E element) {
       synchronized (mutex) {return list.set(index, element);}
   }
   public void add(int index, E element) {
       synchronized (mutex) {list.add(index, element);}
   }
   public E remove(int index) {
       synchronized (mutex) {return list.remove(index);}
   }
   ................
   }
unmodifiableList(List<? extends T> list)修改成不可变得集合，核心原理二次封装集合，实现集合接口，在修改接口直接抛出异常。
static class UnmodifiableList<E> extends UnmodifiableCollection<E>
                              implements List<E> {
    private static final long serialVersionUID = -283967356065247728L;

    final List<? extends E> list;

    UnmodifiableList(List<? extends E> list) {
        super(list);
        this.list = list;
    }

    public boolean equals(Object o) {return o == this || list.equals(o);}
    public int hashCode()           {return list.hashCode();}

    public E get(int index) {return list.get(index);}
    public E set(int index, E element) {
        throw new UnsupportedOperationException();
    }
    public void add(int index, E element) {
        throw new UnsupportedOperationException();
    }
    public E remove(int index) {
        throw new UnsupportedOperationException();
    }
..........
## ThreadLocal
set(t)首先获取当前线程的 ThreadLocalMap，如果不存在，则调用 createMap() 创建一个新的 ThreadLocalMap,当前ThreadLocalMap引用作为key。
public void set(T value) {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null) {
        map.set(this, value);
    } else {
        createMap(t, value);
    }
}

void createMap(Thread t, T firstValue) {
    t.threadLocals = new ThreadLocalMap(this, firstValue);
}

get() 当前线程为key,获取ThreadLocalMap再通过TheadLocal作为可以获取值
public T get() {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null) {
        ThreadLocalMap.Entry e = map.getEntry(this);
        if (e != null) {
            @SuppressWarnings("unchecked")
            T result = (T)e.value;
            return result;
        }
    }
    return setInitialValue();
}
## Executors
下面几个是默认封装好的一些线程池，比如缓存线程池、固定线程池、单线程线程池....


//Java 8 引入的一种线程池实现，专门用于支持工作窃取算法。该线程池适用于任务数量不确定、任务执行时间不一致的场景，能够提高 CPU 的利用率并减少任务执行的延迟。
public static ExecutorService newWorkStealingPool(int parallelism) {
    return new ForkJoinPool
        (parallelism,
         ForkJoinPool.defaultForkJoinWorkerThreadFactory,
         null, true);
}


//固定线程池
public static ExecutorService newFixedThreadPool(int nThreads, ThreadFactory threadFactory) {
    return new ThreadPoolExecutor(nThreads, nThreads,
                                  0L, TimeUnit.MILLISECONDS,
                                  new LinkedBlockingQueue<Runnable>(),
                                  threadFactory);
}

//单线程线程池
public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue<Runnable>()));
}


//缓存线程池

public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>());
}


// 单线程定时线程池
public static ScheduledExecutorService newSingleThreadScheduledExecutor() {
    return new DelegatedScheduledExecutorService
        (new ScheduledThreadPoolExecutor(1));
}
## ThreadPoolExecutor
1. 构造方法核心参数
corePoolSize: 核心线程数，始终保持的最小线程数。

maximumPoolSize: 线程池允许的最大线程数。

keepAliveTime: 非核心线程的存活时间。

workQueue: 用于存储待执行任务的队列。

threadFactory: 用于创建新线程的工厂。

handler: 当线程池无法处理新任务时的拒绝策略。

public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory,
                          RejectedExecutionHandler handler) {
    if (corePoolSize < 0 ||
        maximumPoolSize <= 0 ||
        maximumPoolSize < corePoolSize ||
        keepAliveTime < 0)
        throw new IllegalArgumentException();
    if (workQueue == null || threadFactory == null || handler == null)
        throw new NullPointerException();
    this.corePoolSize = corePoolSize;
    this.maximumPoolSize = maximumPoolSize;
    this.workQueue = workQueue;
    this.keepAliveTime = unit.toNanos(keepAliveTime);
    this.threadFactory = threadFactory;
    this.handler = handler;
}
2. 拒绝策略
ThreadPoolExecutor 提供了多种拒绝策略,当然有接口也能自定义实拒绝策略。

AbortPolicy: 默认策略，抛出异常。
CallerRunsPolicy: 调用者运行策略，任务由调用 execute 的线程执行。
DiscardPolicy: 丢弃任务，不抛出异常。
DiscardOldestPolicy: 丢弃队列中最旧的任务，并尝试提交新任务。
3.了解set方法、get方法
可利用get方法监听线程池状态，通过监听配置中心配置，调用set方法动态调整线程池核心参数。



总结
这些都是java开发都用过得API，对于常用的API需要了解其原理，才能抗得住面试官得拷问。希望这篇博客能帮助你加深对Java基础知识的掌握，继续学习，实践编程，你会发现Java的魅力无穷！